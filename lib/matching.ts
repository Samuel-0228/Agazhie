import { createClient } from '@/lib/supabase/server'

function scheduleScore(availability: Record<string, unknown>, requestedSchedule: string) {
  if (!requestedSchedule) return 0
  const haystack = JSON.stringify(availability).toLowerCase()
  const needle = requestedSchedule.toLowerCase()
  return haystack.includes(needle) ? 10 : 0
}

function toYears(experienceText: string | null | undefined) {
  if (!experienceText) return 0
  const parsed = parseInt(experienceText, 10)
  return Number.isNaN(parsed) ? 0 : parsed
}

export async function getTopTutors(subject: string, grade: string, schedule = '') {
  const supabase = await createClient();
  
  // Note: in a massive database, use a Postgres RPC or pgvector.
  // For now, doing it in memory since it's an MVP structure.
  const { data: tutors, error } = await supabase
    .from('tutors')
    .select('*')
    .eq('is_verified', true)
    .eq('is_open_for_jobs', true);

  if (error || !tutors) {
    console.error("Failed to fetch tutors for matching:", error);
    return [];
  }

  // Basic Scoring Algorithm
  const scoredTutors = tutors.map(tutor => {
    let score = 0;
    
    // Subject match (highest weight)
    const normalizedSubjects = tutor.subjects.map((s: string) => s.toLowerCase());
    if (normalizedSubjects.includes(subject.toLowerCase())) {
      score += 50;
    } else {
      // partial match
      if (normalizedSubjects.some((s: string) => s.includes(subject.toLowerCase()) || subject.toLowerCase().includes(s))) {
        score += 25;
      }
    }

    // Grade match
    const normalizedGrades = tutor.grade_levels.map((g: string) => g.toLowerCase());
    if (normalizedGrades.includes(grade.toLowerCase())) {
      score += 30;
    } else {
      if (normalizedGrades.some((g: string) => g.includes(grade.toLowerCase()) || grade.toLowerCase().includes(g))) {
        score += 15;
      }
    }

    // Tie-breakers
    const experienceScore = tutor.years_experience || toYears(tutor.experience)
    score += Math.min(experienceScore * 2, 20)

    const completedJobsScore = tutor.number_of_jobs_completed || 0
    score += Math.min(completedJobsScore * 2, 20)

    score += scheduleScore(tutor.availability || {}, schedule)

    return {
      ...tutor,
      matchScore: score,
      matchPercentage: Math.min(Math.round(score), 100),
    }
  });

  // Sort descending by score
  scoredTutors.sort((a, b) => b.matchScore - a.matchScore);

  // Return Top 3 matches that have at least some relevance (score > 0)
  return scoredTutors.filter(t => t.matchScore > 0).slice(0, 3);
}

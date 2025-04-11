export type Quiz = {
	id: string;
	name: string;
	description: string;
	questions: Question[];
};

export type Question = {
	title: string;
	answers: Answer[];
};

export type Answer = {
	title: string;
	is_correct: boolean;
};

export type QuizPlayer = {
	id: string;
	created_at: string;
	updated_at: string;
	quiz_id: string;
	total_correct_answers: number;
	total_questions: number;
	user_id: string;
	user_email: string;
	user_name: string;
};

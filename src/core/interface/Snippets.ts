export interface Snippet {
	id: string;
	name: string;
	descripion?: string;
	code: string;
	user_id: string;
	author_name: string;
	created_at: Date;
	updated_at: Date;
	language: string;
}

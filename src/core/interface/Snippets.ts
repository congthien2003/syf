export interface Snippet {
	id: string;
	name: string;
	description: string;
	code: string;
	user_id: string;
	author_name: string;
	created_at: Date;
	updated_at: Date;
	language: string;
	views: number;
}

import supabase from "../../utils/supabase.ts";
// Hàm thêm snippet mới vào database
export const addSnippet = async (
	description: string,
	code: string,
	user_id: string
) => {
	const { data, error } = await supabase
		.from("snippets")
		.insert([{ description, code, user_id }]);
	return { data, error };
};

// Hàm lấy snippet từ database theo ID
export const getSnippetById = async (id: string) => {
	const { data, error } = await supabase
		.from("snippets")
		.select("*")
		.eq("id", id)
		.single();
	return { data, error };
};

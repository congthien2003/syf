import supabase from "../../utils/supabase.ts";
// Hàm thêm snippet mới vào database
export const addSnippet = async (
	description: string,
	code: string,
	user_id: string,
	language: string
) => {
	const { data, error } = await supabase
		.from("snippets")
		.insert([{ description, code, user_id, language }]);
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

export const getList = async (page: number) => {
	const { data, error } = await supabase
		.from("snippets")
		.select("*")
		.range((page - 1) * 5, page * 5 - 1)
		.order("created_at", { ascending: false });
	return { data, error };
};

// Hàm cập nhật snippet vào database
// Cập nhật snippet theo ID
export const updateSnippet = async (
	id: string,
	snippet: Partial<{ description: string; code: string; language: string }>
) => {
	const { data, error } = await supabase
		.from("snippets")
		.update(snippet)
		.eq("id", id);
	return { data, error };
};

// Lấy danh sách snippet theo user_id
export const getSnippetsByUserId = async (user_id: string) => {
	const { data, error } = await supabase
		.from("snippets")
		.select("*")
		.eq("user_id", user_id)
		.order("created_at", { ascending: false });
	return { data, error };
};

// Xóa snippet theo ID
export const deleteSnippet = async (id: string) => {
	const { data, error } = await supabase
		.from("snippets")
		.delete()
		.eq("id", id);
	return { data, error };
};

// Cập nhật lượt xem của snippet (tăng view count lên 1)
export const updateSnippetView = async (id: string, view: number) => {
	const { data, error } = await supabase
		.from("snippets")
		.update({
			views: view,
		})
		.eq("id", id);
	return { data, error };
};

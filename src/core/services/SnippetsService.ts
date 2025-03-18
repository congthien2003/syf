import supabase from "../../utils/supabase.ts";

interface GetListParams {
	page?: number;
	pageSize?: number;
	search?: string;
	filter?: string[];
}

// Hàm thêm snippet mới vào database
export const addSnippet = async (
	name: string,
	description: string,
	code: string,
	user_id: string,
	language: string,
	author_name: string
) => {
	const { data, error } = await supabase
		.from("snippets")
		.insert([{ name, description, code, user_id, language, author_name }]);
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

// Get List
export const getList = async ({
	page = 1,
	pageSize = 5,
	search = "",
	filter = [],
}: GetListParams) => {
	try {
		let query = supabase
			.from("snippets")
			.select("*", { count: "exact" })
			.eq("public", true)
			.order("created_at", { ascending: false });

		// Áp dụng tìm kiếm theo name
		if (search) {
			query = query.ilike("name", `%${search}%`);
		}

		// Áp dụng bộ lọc (filter theo language)
		if (filter.length > 0) {
			query = query.or(
				filter.map((lang) => `language.eq.${lang}`).join(",")
			);
		}

		// Phân trang
		const from = (page - 1) * pageSize;
		const to = from + pageSize - 1;
		query = query.range(from, to);

		// Thực hiện truy vấn
		const { data, error, count } = await query;

		if (error) throw error;

		return {
			data,
			total: count || 0,
			page,
			pageSize,
		};
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
	} catch (error: any) {
		console.error("Error fetching list:", error.message);
		return { data: [], total: 0, page, pageSize, error: error.message };
	}
};

// Add new function to get list by user ID
export const getListByIdUser = async ({
	userId,
	page = 1,
	pageSize = 5,
	search = "",
	filter = [],
}: GetListParams & { userId: string }) => {
	try {
		let query = supabase
			.from("snippets")
			.select("*", { count: "exact" })
			.eq("user_id", userId) // Filter by user_id
			.order("created_at", { ascending: false });

		// Apply search by name
		if (search) {
			query = query.ilike("name", `%${search}%`);
		}

		// Apply language filters
		if (filter.length > 0) {
			query = query.or(
				filter.map((lang) => `language.eq.${lang}`).join(",")
			);
		}

		// Pagination
		const from = (page - 1) * pageSize;
		const to = from + pageSize - 1;
		query = query.range(from, to);

		const { data, error, count } = await query;

		if (error) throw error;

		return {
			data,
			total: count || 0,
			page,
			pageSize,
		};
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
	} catch (error: any) {
		console.error("Error fetching user list:", error.message);
		return { data: [], total: 0, page, pageSize, error: error.message };
	}
};

// Hàm cập nhật snippet vào database
// Cập nhật snippet theo ID
export const updateSnippet = async (
	id: string,
	snippet: Partial<{
		name: string;
		description: string;
		code: string;
		language: string;
		updated_at: Date;
	}>
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

export const updateSnippetStatus = async (id: string, status: boolean) => {
	const { data, error } = await supabase
		.from("snippets")
		.update({
			public: status,
		})
		.eq("id", id);
	return { data, error };
};

// Add this new function
export const updateSnippetLikes = async (id: string, likes: number) => {
	try {
		const { data, error } = await supabase
			.from("snippets")
			.update({ likes })
			.eq("id", id)
			.select()
			.single();

		if (error) throw error;
		return { data, error: null };
	} catch (error) {
		console.error("Error updating snippet likes:", error);
		return { data: null, error };
	}
};

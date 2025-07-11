import { useEffect, useState } from "react";
import axios from "../../../utils/AxiosInstance";
import toast from "react-hot-toast";
import { formatDistanceToNow } from "date-fns";
import { useAuth } from "../../../context/AuthContext";

const CommentsSection = ({ ideaId }) => {
  const { currentUser } = useAuth();
  const [comments, setComments] = useState([]);
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [posting, setPosting] = useState(false);

  const fetchComments = async () => {
    try {
      const res = await axios.get(`/comments/${ideaId}`);
      if (res.data.success) {
        setComments(res.data.comment || []);
      }
    } catch (error) {
      toast.error("error while fetching the comments");
    } finally {
      setLoading(false);
    }
  };

  const postcomments = async (e) => {
    e.preventDefault();
    setPosting(true);
    try {
      const res = await axios.post(`/comments/${ideaId}`, { content });
      if (res.data.success) {
        setComments((prev) => [...prev, res.data.newComment]);
        setContent("");
        toast.success("Comment Posted");
        await fetchComments();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "failed to post comment");
    } finally {
      setLoading(false);
    }
  };

  const deleteComment = async (id) => {
    try {
      await axios.delete(`/comments/${id}`);
      setComments((prev) => prev.filter((c) => c._id !== id));
      toast.success("comment deleted");
    } catch (error) {
      toast.error("failed to delete comment");
    }
  };

  useEffect(() => {
    fetchComments();
  }, [ideaId]);

  return (
    <div className='mt-6'>
      <h3 className='text-lg font-semibold mb-4'>💬 Comments</h3>
      <form onSubmit={postcomments} className='mb-6'>
        <textarea
          className='w-full p-3 rounded-md border dark:bg-gray-800'
          rows={3}
          placeholder='Write your comment...'
          value={content}
          onChange={(e) => setContent(e.target.value)}
          disabled={posting}
        />
        <button
          type='submit'
          disabled={posting}
          className='mt-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md disabled:opacity-50'>
          {posting ? "posting..." : "Post Comment"}
        </button>
      </form>

      {loading ? (
        <p>loading Comments....</p>
      ) : comments.length === 0 ? (
        <p className='text-gray-500 italic'>No comments yet.</p>
      ) : (
        <ul className='space-y-4'>
          {comments.map((comment) => (
            <li
              key={comment._id}
              className='border-b pb-3 border-gray-300 dark:border-gray-700'>
              <p className='text-sm'>{comment.content}</p>
              <div className='text-xs text-gray-500 dark:text-gray-400 mt-1 flex justify-between items-center'>
                <span>
                  By<strong>{comment.author?.email}</strong>.{" "}
                  {formatDistanceToNow(new Date(comment.createdAt), {
                    addSuffix: true,
                  })}
                </span>
                {currentUser?._id === comment.author._id && (
                  <button
                    onClick={() => deleteComment(comment._id)}
                    className='text-red-500 hover:underline text-xs ml-4'>
                    Delete
                  </button>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CommentsSection;

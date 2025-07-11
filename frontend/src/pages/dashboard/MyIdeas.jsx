import axios from "../../utils/AxiosInstance";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { FaTrash, FaHeart, FaRegHeart, FaEdit } from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";

const MyIdeas = () => {
  const { currentUser } = useAuth();
  const [ideas, setIdeas] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingIdea, setEditingIdea] = useState(null);
  const [editForm, setEditForm] = useState({
    title: "",
    description: "",
    category: "",
    stage: "raw",
  });
  useEffect(() => {
    fetchIdeas();
  }, []);

  const openEditModal = (idea) => {
    setEditingIdea(idea);
    setEditForm({
      title: idea.title,
      description: idea.description,
      category: idea.category || "",
      stage: idea.stage,
    });
  };

  const exportToCSV = () => {
    const csvRows = [
      ["Title", "Category", "Stage", "Is Favourite"],
      ...ideas.map((idea) => [
        idea.title,
        idea.category || "N/A",
        idea.stage,
        idea.isFavourite ? "Yes" : "No",
      ]),
    ];
    const csvContent = csvRows.map((row) => row.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "my_ideas.csv";
    link.click();
  };

  const fetchIdeas = async () => {
    try {
      const res = await axios.get("/ideas");

      const currentUserId = currentUser?._id;
      if (!currentUserId) {
        toast.error("User ID missing. Please login again.");
        return;
      }

      const userIdeas = res.data.ideas.filter(
        (idea) => idea.owner?._id === currentUserId
      );
      setIdeas(userIdeas);
    } catch (error) {
      console.error("❌ Fetch error:", error?.response || error.message);
      toast.error("Failed to fetch your ideas");
    }
  };

  const handleStageChange = async (ideaId, newStage) => {
    try {
      const res = await axios.post(`/ideas/${ideaId}`, { stage: newStage });
      if (res.data.success) {
        toast.success("Stage updated !");
        fetchIdeas();
      }
    } catch (error) {
      console.error("❌ Stage update failed:", error?.response?.data?.message);
      toast.error("Failed to update stage");
    }
  };

  const toggleFavourite = async (ideaId) => {
    try {
      const res = await axios.post(`/ideas/${ideaId}/favourite`);
      if (res.data.success) {
        toast.success("Favourite status update");

        setIdeas((prevIdeas) =>
          prevIdeas.map((idea) =>
            idea._id === ideaId
              ? { ...idea, isFavourite: !idea.isFavourite }
              : idea
          )
        );
      }
    } catch (err) {
      toast.error("Failed to update favourite");
    }
  };

  const deleteIdea = async (ideaId) => {
    const confirm = window.confirm(
      "Are you sure you want to delete the Idea? "
    );
    if (!confirm) return;
    try {
      const res = await axios.delete(`ideas/${ideaId}`);
      if (res.data.success) {
        toast.success("idea deleted");
        fetchIdeas();
      }
    } catch (error) {
      toast.error("Failed to delete idea");
    }
  };
  const getStageCounts = () => {
    const counts = {
      raw: 0,
      "in-progress": 0,
      launched: 0,
    };
    ideas.forEach((idea) => {
      const stage = idea.stage?.toLowerCase();
      if (stage && counts.hasOwnProperty(stage)) {
        counts[stage]++;
      }
    });
    return counts;
  };
  const stagecounts = getStageCounts();
  return (
    <>
      <div className='p-6'>
        <h2 className='text-2xl font-bold mb-4'>My Ideas</h2>
        <input
          type='text'
          placeholder='search your ideas...'
          className='px-4 py-2 rounded-md border w-full md:w-1/2 mb-4 dark:bg-gray-800 dark:text-white'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className='mb-4 px-4 py-3 rounded-md bg-blue-100 dark:bg-gray-700 text-blue-900 dark:text-white shadow-sm text-sm md:text-base'>
          🧠 You've launched{" "}
          <strong className='text-green-600'>{stagecounts.launched}</strong>{" "}
          idea
          {stagecounts.launched !== 1 && "s"} 🎉 | In Progress:{" "}
          <strong className='text-yellow-600'>
            {stagecounts["in-progress"]}
          </strong>{" "}
          | Raw: <strong className='text-gray-600'>{stagecounts.raw}</strong>
        </motion.div>
        <button
          onClick={exportToCSV}
          className='mb-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-all'>
          {" "}
          📥 Export to CSV
        </button>

        <div className='overflow-auto rounded-lg shadow'>
          <motion.table
            className='w-full table-auto border-collapse dark:text-white '
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}>
            <thead className='bg-blue-200 dark:text-gray-700 sticky top-0 z-10'>
              <tr>
                <th className='px-4 py-2'>#</th>
                <th>Title</th>
                <th>Category</th>
                <th>Stage</th>
                <th>Fav</th>
                <th>Actions</th>
                <th>Edit</th>
              </tr>
            </thead>
            <tbody>
              {ideas
                .filter((idea) =>
                  idea.title.toLowerCase().includes(searchTerm.toLowerCase())
                )
                .map((idea, index) => (
                  <tr
                    key={idea._id}
                    className='text-center hover:bg-blue-50 dark:bg-gray-800 transition-all'>
                    <td className='p-2'>{index + 1}</td>
                    <td>{idea.title}</td>
                    <td>{idea.category || "N/A"}</td>
                    <td>
                      <select
                        value={idea.stage}
                        onChange={(e) =>
                          handleStageChange(idea._id, e.target.value)
                        }
                        className='bg-transparent border bg-gray-700 dark:bg-gray-600'>
                        <option value='raw'>Raw</option>
                        <option value='in-progress'>In Progress</option>
                        <option value='launched'>Launched</option>
                      </select>
                    </td>
                    <td>
                      <button
                        onClick={() => toggleFavourite(idea._id)}
                        className='text-lg text-red-500 hover:scale-110 transition-transform'>
                        {idea.isFavourite ? <FaHeart /> : <FaRegHeart />}
                      </button>
                    </td>
                    <td>
                      <button
                        onClick={() => deleteIdea(idea._id)}
                        className='text-lg text-red-600 hover:text-red-800 transition-colors '>
                        <FaTrash />
                      </button>
                    </td>
                    <td>
                      <button onClick={() => openEditModal(idea)}>
                        <FaEdit className='text-blue-600  hover:text-blue-800 text-lg'></FaEdit>
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </motion.table>
        </div>
      </div>
      {editingIdea && (
        <div className='fixed inset-0 bg-black/40 flex items-center justify-center z-50'>
          <div className='bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full max-wlg'>
            <h2 className='text-xl font-semibold mb-4 text-center'>
              Edit Idea
            </h2>
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                try {
                  const res = await axios.post(
                    `/ideas/${editingIdea._id}`,
                    editForm
                  );
                  if (res.data.success) {
                    toast.success("idea updated successfully");
                    setEditingIdea(null);
                    fetchIdeas();
                  }
                } catch (error) {
                  console.error("updating idea error", error);
                  toast.error("error while updating idea");
                }
              }}>
              <input
                type='text'
                placeholder='title'
                name='title'
                value={editForm.title}
                onChange={(e) =>
                  setEditForm({ ...editForm, title: e.target.value })
                }
                className='w-full mb-3 px-4 py-2 rounded-md border dark:bg-gray-700 dark:text-white'
              />
              <textarea
                placeholder='Description'
                name='description'
                value={editForm.description}
                onChange={(e) =>
                  setEditForm({ ...editForm, description: e.target.value })
                }
                className='w-full mb-3 px-4 py-2 rounded-md border dark:bg-gray-700 dark:text-white'
              />
              <input
                type='text'
                placeholder='Category'
                name='category'
                value={editForm.category}
                onChange={(e) =>
                  setEditForm({ ...editForm, category: e.target.value })
                }
                className='w-full mb-3 px-4 py-2 rounded-md border dark:bg-gray-700 dark:text-white'
              />
              <select
                name='stage'
                value={editForm.stage}
                onChange={(e) =>
                  setEditForm({ ...editForm, stage: e.target.value })
                }
                className='w-full mb-3 px-4 py-2 rounded-md border dark:bg-gray-700 dark:text-white'>
                <option value='raw'>Raw</option>
                <option value='in-progress'>In Progress</option>
                <option value='launched'>Launched</option>
              </select>
              <div className='flex justify-end gap-4'>
                <button
                  type='button'
                  onClick={() => setEditingIdea(null)}
                  className='px-4 py-2 bg-gray-300 hover:bg-gray-400 text-black rounded-md'>
                  Cancel
                </button>
                <button
                  type='submit'
                  className='px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md'>
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default MyIdeas;

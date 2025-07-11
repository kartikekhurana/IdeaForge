import { useEffect, useState } from "react";
import axios from "../../utils/AxiosInstance";
import IdeaCard from "./component/IdeaCard";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";
const DashboardHome = () => {
  const [ideas, setIdeas] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchIdeas = async () => {
    try {
      const res = await axios.get("/ideas");
      if (res.data.success) {
        setIdeas(res.data.ideas);
      }
    } catch (error) {
      console.error("error while fetching ideas : ", ideas);
    } finally {
      setLoading(false);
    }
  };
      useEffect(() => {
      fetchIdeas();
    }, []);
  return (
    <div className='px-4 py-8 '>
      <h2 className='text-2xl font-bold mb-6 text-center'>All Ideas</h2>
      {loading ? (
        <p className='text-center'>loading...</p>
      ) : (
        <motion.div
          initial='hidden'
          animate='visible'
          className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {ideas.map((idea) => (
            <IdeaCard key={idea._id} idea={idea}></IdeaCard>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default DashboardHome;

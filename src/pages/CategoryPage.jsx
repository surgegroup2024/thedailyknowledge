import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock, User, Loader2 } from 'lucide-react';
import { categories } from '@/lib/data';
import { supabase } from '@/lib/customSupabaseClient';

// Generate URL-friendly slug from title
const generateSlug = (title) => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
};

const CategoryPage = () => {
  const { slug } = useParams();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const category = categories.find(c => c.slug === slug);

  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true);
      setError(null);
      try {
        const { data, error } = await supabase
          .from('articles')
          .select(`
            *,
            article_content (
              structured_data
            )
          `)
          .eq('niche', category.name)
          .not('published_at', 'is', null)
          .order('published_at', { ascending: false });

        if (error) throw error;
        console.log('Fetched articles for slug:', slug, 'Data:', data);
        
        // Map the data to match the component's expectations
        const mappedArticles = (data || []).map(article => ({
          ...article,
          // Map thumbnail from structured_data if available, otherwise fallback to image_url
          image_url: article.article_content?.structured_data?.sections?.[0]?.imageUrl || article.image_url,
          // Map excerpt from structured_data if available, otherwise fallback to existing excerpt
          excerpt: article.article_content?.structured_data?.metaDescription || article.excerpt
        }));
        
        setArticles(mappedArticles);
      } catch (err) {
        console.error('Error fetching articles:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchArticles();
    }
  }, [slug]);

  if (!category) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-4">
        <h1 className="text-2xl text-[#2C2C2C] mb-4">Category not found</h1>
        <Link to="/" className="text-[#C97C5C] hover:underline">Return Home</Link>
      </div>
    );
  }

  const Icon = category.icon;

  const formatDate = (dateString) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <>
      <Helmet>
        <title>{category.name} Articles - The Daily Knowledge</title>
        <meta name="description" content={`Read the best articles about ${category.name} on The Daily Knowledge.`} />
      </Helmet>
      
      <div className="bg-[#F5F1E8] min-h-screen pb-20">
        <div className="bg-white border-b border-[#A8B8A8]/20">
          <div className="max-w-6xl mx-auto px-4 py-12 md:py-20">
            <Link to="/" className="inline-flex items-center text-[#2C2C2C]/60 hover:text-[#C97C5C] mb-6 transition-colors">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Link>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-4"
            >
              <div 
                className="w-16 h-16 rounded-full flex items-center justify-center shadow-inner"
                style={{ backgroundColor: `${category.color}20` }}
              >
                <Icon className="w-8 h-8" style={{ color: category.color }} />
              </div>
              <div>
                <h1 className="text-4xl md:text-5xl font-bold text-[#2C2C2C]">{category.name}</h1>
                <p className="text-[#2C2C2C]/60 mt-2 text-lg">Curated insights and essential reads.</p>
              </div>
            </motion.div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 py-12">
          {loading ? (
             <div className="flex flex-col items-center justify-center py-20">
                <Loader2 className="w-10 h-10 text-[#C97C5C] animate-spin mb-4" />
                <p className="text-[#2C2C2C]/60">Loading articles...</p>
             </div>
          ) : error ? (
            <div className="text-center py-20">
               <p className="text-red-500 mb-4">Unable to load articles: {error}</p>
               <button onClick={() => window.location.reload()} className="text-[#C97C5C] hover:underline">Try Again</button>
            </div>
          ) : articles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {articles.map((article, index) => (
                <motion.article
                  key={article.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-[#A8B8A8]/10 group flex flex-col h-full"
                >
                  <Link to={`/article/${generateSlug(article.title)}`} className="block overflow-hidden h-48 relative">
                    <img 
                      alt={article.image_alt || article.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      src={article.image_url || "https://images.unsplash.com/photo-1595872018818-97555653a011"} 
                      onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1595872018818-97555653a011"; }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#2C2C2C]/20 to-transparent"></div>
                  </Link>
                  
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="flex items-center gap-4 text-xs font-medium text-[#2C2C2C]/50 mb-3">
                      <span className="flex items-center gap-1">
                        <User className="w-3 h-3" /> {article.author}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {formatDate(article.published_at)}
                      </span>
                    </div>

                    <Link to={`/article/${generateSlug(article.title)}`} className="block mb-3">
                      <h2 className="text-xl font-bold text-[#2C2C2C] group-hover:text-[#C97C5C] transition-colors line-clamp-2">
                        {article.title}
                      </h2>
                    </Link>

                    <p className="text-[#2C2C2C]/70 text-sm mb-6 line-clamp-3 flex-1">
                      {article.excerpt}
                    </p>

                    <Link 
                      to={`/article/${generateSlug(article.title)}`} 
                      className="inline-block text-center w-full py-3 rounded-lg bg-[#F5F1E8] text-[#2C2C2C] font-semibold hover:bg-[#A8B8A8] hover:text-white transition-all duration-300"
                    >
                      Read Article
                    </Link>
                  </div>
                </motion.article>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-[#A8B8A8]/30">
              <div className="w-16 h-16 bg-[#F5F1E8] rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon className="w-8 h-8 text-[#A8B8A8]" />
              </div>
              <h3 className="text-xl font-bold text-[#2C2C2C] mb-2">No Articles Yet</h3>
              <p className="text-[#2C2C2C]/60">We're working on new content for this category. Check back soon!</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CategoryPage;
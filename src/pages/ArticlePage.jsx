import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock, User, Share2, Bookmark, Loader2 } from 'lucide-react';
import { categories } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/lib/customSupabaseClient';

const isLikelyHtml = (s) => typeof s === 'string' && /<\/?[a-z][\s\S]*>/i.test(s);

const sanitizeHtml = (html) => {
  const t = document.createElement('template');
  t.innerHTML = html || '';
  const removeNodes = t.content.querySelectorAll('script, iframe, object, embed, link, meta');
  removeNodes.forEach((el) => el.remove());
  const walk = (node) => {
    if (node.nodeType === 1) {
      const attrs = Array.from(node.attributes);
      for (const a of attrs) {
        const n = a.name.toLowerCase();
        if (n.startsWith('on')) node.removeAttribute(a.name);
      }
      node.childNodes.forEach(walk);
    }
  };
  t.content.childNodes.forEach(walk);
  return t.innerHTML;
};

// Generate URL-friendly slug from title
export const generateSlug = (title) => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-')          // Replace spaces with hyphens
    .replace(/-+/g, '-')           // Remove consecutive hyphens
    .replace(/^-|-$/g, '');        // Remove leading/trailing hyphens
};

const ArticlePage = () => {
  const { slug } = useParams();
  const { toast } = useToast();
  
  const [article, setArticle] = useState(null);
  const [relatedArticles, setRelatedArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticleAndRelated = async () => {
      setLoading(true);
      setError(null);
      try {
        // Fetch all published articles and find by matching slug
        const { data: allArticles, error: fetchError } = await supabase
          .from('articles')
          .select(`
            *,
            article_content (
              html_content,
              structured_data
            )
          `)
          .not('published_at', 'is', null);

        if (fetchError) throw fetchError;
        
        // Find the article whose title matches the slug
        const articleData = allArticles?.find(a => generateSlug(a.title) === slug);
        
        if (!articleData) {
          throw new Error('Article not found');
        }
        
        console.log('Raw article data:', articleData);
        console.log('article_content:', articleData.article_content);
        console.log('structured_data:', articleData.article_content?.structured_data);
        console.log('sections:', articleData.article_content?.structured_data?.sections);
        
        // Map main article data
        const mappedArticle = {
            ...articleData,
            content: articleData.article_content?.html_content || articleData.content,
            structured_data: articleData.article_content?.structured_data,
            image_url: articleData.article_content?.structured_data?.sections?.[0]?.imageUrl || articleData.image_url,
            excerpt: articleData.article_content?.structured_data?.metaDescription || articleData.excerpt
        };
        
        setArticle(mappedArticle);

        // Fetch Related Articles (same category, excluding current)
        if (articleData && articleData.niche) {
            const { data: relatedData, error: relatedError } = await supabase
                .from('articles')
                .select(`
                    *,
                    article_content (
                        structured_data
                    )
                `)
                .eq('niche', articleData.niche)
                .neq('id', articleData.id)
                .not('published_at', 'is', null)
                .limit(2);
            
            if (!relatedError) {
                // Map related articles data
                const mappedRelated = (relatedData || []).map(item => ({
                    ...item,
                    image_url: item.article_content?.structured_data?.sections?.[0]?.imageUrl || item.image_url,
                    excerpt: item.article_content?.structured_data?.metaDescription || item.excerpt
                }));
                setRelatedArticles(mappedRelated);
            }
        }

      } catch (err) {
        console.error('Error fetching article:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchArticleAndRelated();
    }
  }, [slug]);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({
      title: "Link Copied!",
      description: "Article link copied to clipboard.",
    });
  };

  const handleBookmark = () => {
    toast({
      title: "Saved!",
      description: "Article saved to your reading list.",
    });
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
     return (
        <div className="min-h-screen bg-[#F5F1E8] flex flex-col items-center justify-center p-4">
            <Loader2 className="w-10 h-10 text-[#C97C5C] animate-spin mb-4" />
            <p className="text-[#2C2C2C]/60">Loading content...</p>
        </div>
     );
  }

  if (error || !article) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-4 bg-[#F5F1E8]">
        <h1 className="text-2xl text-[#2C2C2C] mb-4">Article not found</h1>
        <p className="text-[#2C2C2C]/60 mb-6">{error ? "There was an error loading this article." : "The article you are looking for doesn't exist."}</p>
        <Link to="/" className="text-[#C97C5C] hover:underline font-medium">Return Home</Link>
      </div>
    );
  }

  const category = categories.find(c => c.name === article.niche) || { name: 'Article', slug: '#', color: '#A8B8A8' };

  return (
    <>
      <Helmet>
        <title>{article.title} - The Daily Knowledge</title>
        <meta name="description" content={article.excerpt} />
      </Helmet>

      <div className="bg-[#F5F1E8] min-h-screen pb-20">
        {/* Article Header */}
        <div className="relative h-[400px] md:h-[500px]">
          <img 
            alt={article.image_alt || article.title}
            className="w-full h-full object-cover"
            src={article.image_url || "https://images.unsplash.com/photo-1595872018818-97555653a011"}
            onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1595872018818-97555653a011"; }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#2C2C2C] via-[#2C2C2C]/50 to-transparent opacity-90"></div>
          
          <div className="absolute bottom-0 left-0 right-0 p-4 pb-12 md:pb-20">
            <div className="max-w-3xl mx-auto">
              <Link 
                to={`/category/${category.slug}`}
                className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#C97C5C] text-white mb-4 hover:bg-white hover:text-[#C97C5C] transition-colors"
              >
                {category.name}
              </Link>
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight"
              >
                {article.title}
              </motion.h1>
              
              <div className="flex flex-wrap items-center gap-6 text-white/80 text-sm md:text-base">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                    <User className="w-4 h-4 text-white" />
                  </div>
                  <span className="font-medium">{article.author}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{formatDate(article.published_at)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 rounded-full bg-white/50"></div>
                  <span>5 min read</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-3xl mx-auto px-4 -mt-8 relative z-10">
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 mb-12">
             <div className="flex justify-between items-center mb-8 border-b border-[#A8B8A8]/20 pb-6">
                <Link to={`/category/${category.slug}`} className="text-[#A8B8A8] hover:text-[#C97C5C] flex items-center gap-2 text-sm font-semibold transition-colors">
                  <ArrowLeft className="w-4 h-4" /> Back to {category.name}
                </Link>
                <div className="flex gap-2">
                  <Button variant="ghost" size="icon" onClick={handleShare} className="hover:text-[#C97C5C]">
                    <Share2 className="w-5 h-5" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={handleBookmark} className="hover:text-[#C97C5C]">
                    <Bookmark className="w-5 h-5" />
                  </Button>
                </div>
             </div>

             <div className="prose prose-lg prose-headings:text-[#2C2C2C] prose-p:text-[#2C2C2C]/80 prose-a:text-[#C97C5C] max-w-none">
                <p className="lead text-xl text-[#2C2C2C]/90 font-medium italic mb-8 border-l-4 border-[#C97C5C] pl-4">
                  {article.excerpt}
                </p>
                {article.structured_data?.sections ? (
                    <>
                        {/* Introduction */}
                        {article.structured_data.introduction && (
                            <div dangerouslySetInnerHTML={{ __html: sanitizeHtml(article.structured_data.introduction) }} className="mb-10" />
                        )}
                        
                        {/* Sections */}
                        {article.structured_data.sections.map((section, index) => (
                        <div key={index} className="mb-12">
                            {section.title && <h2 className="text-2xl font-bold text-[#2C2C2C] mb-6">{section.title}</h2>}
                            
                            {section.imageUrl && (
                                <div className="mb-8 rounded-xl overflow-hidden shadow-lg">
                                    <img 
                                        src={section.imageUrl} 
                                        alt={section.title || article.title} 
                                        className="w-full h-auto object-cover"
                                        onError={(e) => { e.target.style.display = 'none'; }}
                                    />
                                    {section.imagePrompt && (
                                        <p className="text-sm text-[#2C2C2C]/60 italic mt-2 text-center">{section.imagePrompt}</p>
                                    )}
                                </div>
                            )}

                            {section.content && (
                                <div dangerouslySetInnerHTML={{ __html: sanitizeHtml(section.content) }} className="mb-6" />
                            )}

                            {section.tips && section.tips.length > 0 && (
                                <div className="bg-[#F5F1E8]/50 rounded-xl p-6 border border-[#A8B8A8]/20">
                                    <h3 className="text-lg font-bold text-[#C97C5C] mb-4 flex items-center gap-2">
                                        <div className="w-2 h-2 rounded-full bg-[#C97C5C]"></div>
                                        Pro Tips
                                    </h3>
                                    <ul className="space-y-3">
                                        {section.tips.map((tip, i) => (
                                            <li key={i} className="flex gap-3 text-[#2C2C2C]/80">
                                                <span className="text-[#C97C5C] font-bold">•</span>
                                                {tip}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    ))}
                    </>
                ) : article.content && isLikelyHtml(article.content) ? (
                  <div dangerouslySetInnerHTML={{ __html: sanitizeHtml(article.content) }} />
                ) : (
                  (article.content || '').split('\n\n').map((paragraph, idx) => (
                    <p key={idx} className="mb-6 whitespace-pre-line leading-relaxed">
                      {paragraph.trim()}
                    </p>
                  ))
                )}
             </div>
          </div>

          {relatedArticles.length > 0 && (
            <div className="mb-20">
              <h3 className="text-2xl font-bold text-[#2C2C2C] mb-6">Related Articles</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {relatedArticles.map((relArticle) => (
                  <Link key={relArticle.id} to={`/article/${generateSlug(relArticle.title)}`} className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all">
                     <div className="flex h-32">
                        <div className="w-32 shrink-0">
                          <img 
                            className="w-full h-full object-cover" 
                            alt={relArticle.image_alt || relArticle.title} 
                            src={relArticle.image_url || "https://images.unsplash.com/photo-1677694031058-95963b42a0b7"}
                            onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1677694031058-95963b42a0b7"; }}
                           />
                        </div>
                        <div className="p-4 flex flex-col justify-center">
                          <h4 className="font-bold text-[#2C2C2C] group-hover:text-[#C97C5C] transition-colors mb-2 line-clamp-2">{relArticle.title}</h4>
                          <span className="text-xs text-[#A8B8A8] font-medium">{formatDate(relArticle.published_at)}</span>
                        </div>
                     </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ArticlePage;
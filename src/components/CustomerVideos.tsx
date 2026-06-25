import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, Heart, MessageCircle, Volume2, VolumeX, Share2, MapPin, Award, CheckCircle, Send, MessageSquare } from 'lucide-react';

interface ReelVideo {
  id: string;
  username: string;
  location: string;
  capacity: string;
  savings: string;
  videoUrl: string;
  thumbnailUrl: string;
  likes: string;
  commentsCount: string;
  views: string;
  caption: string;
  comments: { user: string; text: string; time: string }[];
}

export default function CustomerVideos() {
  const [activeReel, setActiveReel] = useState<ReelVideo | null>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const [newComment, setNewComment] = useState('');
  const [commentsList, setCommentsList] = useState<{ [key: string]: { user: string; text: string; time: string }[] }>({});
  const videoRef = useRef<HTMLVideoElement>(null);

  const reels: ReelVideo[] = [
    {
      id: 'reel-1',
      username: 'thepowerplanet',
      location: 'Nishat, Srinagar',
      capacity: '5.5 kWp System',
      savings: '₹38,000 Saved',
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
      thumbnailUrl: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=600&auto=format&fit=crop&q=80',
      likes: '2.4K',
      commentsCount: '142',
      views: '18.5K',
      caption: 'Hear from Bashir Ahmed Lone in Srinagar! He shares how our custom snow-shedding sloped solar design handled the heavy winter snow during Chillai Kalan and cut his bills by 90%! 🏔️☀️ #KashmirSolar #Srinagar #CleanEnergy #ZeroBills',
      comments: [
        { user: 'irfan_bhat', text: 'This is brilliant! My house in Nishat has a similar tin roof. Will contact you guys soon.', time: '2d' },
        { user: 'srinagar_solar_guy', text: 'Excellent installation. The slopes are perfect for shedding winter snow.', time: '1d' },
        { user: 'rumaisa_m', text: 'How much space is needed for a 5kW system?', time: '8h' }
      ]
    },
    {
      id: 'reel-2',
      username: 'thepowerplanet',
      location: 'Pahalgam, J&K',
      capacity: '8.0 kWp Hybrid',
      savings: 'Radiators Powered',
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
      thumbnailUrl: 'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=600&auto=format&fit=crop&q=80',
      likes: '1.8K',
      commentsCount: '98',
      views: '14.2K',
      caption: 'Resort manager Tariq Malik explains why reliable power is crucial in Pahalgam. Our hybrid battery solar solution keeps the heating radiators running smoothly even during winter grid blackouts! ❄️🔋 #EcoResort #Pahalgam #HybridSolar #ReliablePower',
      comments: [
        { user: 'pahalgam_tourism', text: 'Exactly what every hotel and homestay in Pahalgam needs.', time: '3d' },
        { user: 'farooq_shah', text: 'Does the hybrid system run heating boilers too?', time: '2d' },
        { user: 'tariq_malik_guest', text: 'Stayed here last winter, power backup was flawless!', time: '1d' }
      ]
    },
    {
      id: 'reel-3',
      username: 'thepowerplanet',
      location: 'Karan Nagar, Srinagar',
      capacity: '12.0 kWp Array',
      savings: 'Commercial Savings',
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
      thumbnailUrl: 'https://images.unsplash.com/photo-1613665813446-82a78c468a1d?w=600&auto=format&fit=crop&q=80',
      likes: '3.1K',
      commentsCount: '185',
      views: '24.9K',
      caption: 'Commercial scale success! Dr. Farooq Shah shows off the 12kW flat roof array powering their business and cold storage in Karan Nagar. Net-metering fully integrated into the JKPDD grid! 🏢⚡ #SrinagarBusiness #CommercialSolar #NetMetering #Kashmir',
      comments: [
        { user: 'kashmiri_biz', text: 'What is the payback period for commercial setups in J&K?', time: '4d' },
        { user: 'bilal_dar', text: 'Great work! Net metering approval was quick?', time: '3d' },
        { user: 'shazia_k', text: 'This looks so neat. Power Planet is doing amazing work in the Valley.', time: '1d' }
      ]
    }
  ];

  // Initialize comments state
  useEffect(() => {
    const initialComments: { [key: string]: { user: string; text: string; time: string }[] } = {};
    reels.forEach(reel => {
      initialComments[reel.id] = reel.comments;
    });
    setCommentsList(initialComments);
  }, []);

  // Handle play/pause key or click
  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play().catch(err => console.log(err));
      }
      setIsPlaying(!isPlaying);
    }
  };

  // Keep video play state synced if modal opens
  useEffect(() => {
    if (activeReel) {
      setIsPlaying(true);
      // Wait for element to mount
      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.play().catch(err => {
            console.log("Autoplay blocked: ", err);
            setIsPlaying(false);
          });
        }
      }, 100);
    }
  }, [activeReel]);

  const handleAddComment = (reelId: string) => {
    if (!newComment.trim()) return;
    const commentObj = {
      user: 'kashmiri_visitor',
      text: newComment.trim(),
      time: 'Just now'
    };
    setCommentsList(prev => ({
      ...prev,
      [reelId]: [commentObj, ...(prev[reelId] || [])]
    }));
    setNewComment('');
  };

  return (
    <section id="customer-videos" className="py-20 bg-slate-50 border-t border-slate-100 relative overflow-hidden">
      {/* Background blobs */}
      <div className="absolute top-1/4 left-0 -z-10 w-[300px] h-[300px] rounded-full bg-radial from-[#c6ebd9]/10 to-transparent blur-3xl opacity-50 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 md:px-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-secondary/10 rounded-full border border-secondary/20 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" />
            <span className="text-[10px] md:text-xs font-bold text-primary uppercase tracking-widest">Instagram Customer Reels</span>
          </div>
          <h2 className="text-3xl md:text-4xl text-primary font-black tracking-tight leading-tight">
            See the Savings in Action
          </h2>
          <p className="text-slate-500 text-sm mt-3 leading-relaxed">
            Real Kashmiri families and business owners share their experiences. Watch their video testimonials of installations in Srinagar, Pahalgam, and across J&K.
          </p>
        </div>

        {/* Reels Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {reels.map((reel) => (
            <motion.div
              key={reel.id}
              whileHover={{ y: -6 }}
              transition={{ duration: 0.3 }}
              onClick={() => setActiveReel(reel)}
              className="relative aspect-[9/16] rounded-3xl overflow-hidden shadow-lg border border-slate-200/50 cursor-pointer group bg-black"
            >
              {/* Thumbnail Cover */}
              <img
                src={reel.thumbnailUrl}
                alt={`Solar installation in ${reel.location}`}
                className="absolute inset-0 w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-700"
              />
              
              {/* Vignette Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/40 group-hover:from-black/90 transition-all duration-300" />

              {/* Top Banner: Location */}
              <div className="absolute top-4 left-4 right-4 flex justify-between items-center z-10">
                <div className="flex items-center gap-1.5 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 text-white">
                  <MapPin className="w-3.5 h-3.5 text-secondary" />
                  <span className="text-[10px] font-bold tracking-wide uppercase">{reel.location}</span>
                </div>
                <div className="w-7 h-7 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white">
                  <Play className="w-3 h-3 fill-white ml-0.5" />
                </div>
              </div>

              {/* Bottom Info */}
              <div className="absolute bottom-5 left-4 right-4 text-white z-10 flex flex-col gap-2">
                <div className="flex flex-wrap gap-1.5">
                  <span className="text-[8px] uppercase tracking-wider font-extrabold px-2 py-0.5 rounded-md bg-secondary text-white">
                    {reel.capacity}
                  </span>
                  <span className="text-[8px] uppercase tracking-wider font-extrabold px-2 py-0.5 rounded-md bg-accent text-white">
                    {reel.savings}
                  </span>
                </div>

                <div className="flex items-center gap-1.5 mt-1">
                  <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center font-bold text-[10px] text-white border border-white/20">
                    T
                  </div>
                  <span className="text-xs font-bold tracking-wide">@{reel.username}</span>
                  <CheckCircle className="w-3 h-3 text-secondary fill-secondary" />
                </div>

                <p className="text-[11px] text-slate-200 line-clamp-2 mt-1 leading-relaxed">
                  {reel.caption}
                </p>

                {/* Social Stats Overlay (Visible on Hover / Always on mobile) */}
                <div className="flex items-center gap-4 pt-3.5 mt-1.5 border-t border-white/10 text-white/90 text-xs">
                  <span className="flex items-center gap-1"><Heart className="w-3.5 h-3.5 text-secondary fill-secondary" /> {reel.likes}</span>
                  <span className="flex items-center gap-1"><MessageCircle className="w-3.5 h-3.5" /> {reel.commentsCount}</span>
                  <span className="ml-auto text-[10px] text-white/50">{reel.views} views</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Reels Interactive Modal */}
      <AnimatePresence>
        {activeReel && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-0 md:p-4 bg-primary/45 backdrop-blur-md">
            {/* Click outside to close */}
            <div className="absolute inset-0" onClick={() => setActiveReel(null)} />

            {/* Main Mock Reels Interface Container */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className="relative w-full max-w-[850px] h-full md:h-[90vh] md:max-h-[720px] bg-white md:rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row z-10 border border-slate-100"
            >
              {/* Close button for mobile */}
              <button 
                onClick={() => setActiveReel(null)}
                className="absolute top-4 right-4 z-40 w-8 h-8 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center font-bold md:hidden"
              >
                ✕
              </button>

              {/* Video Player Side (9:16 layout) */}
              <div className="relative w-full md:w-[420px] h-[60%] md:h-full bg-black flex items-center justify-center shrink-0">
                <video
                  ref={videoRef}
                  src={activeReel.videoUrl}
                  poster={activeReel.thumbnailUrl}
                  loop
                  muted={isMuted}
                  playsInline
                  onClick={togglePlay}
                  className="w-full h-full object-cover cursor-pointer"
                />

                {/* Video controls overlays */}
                <div className="absolute bottom-5 left-4 right-4 text-white pointer-events-none flex flex-col gap-2 z-20">
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-secondary" />
                    <span className="text-[11px] font-extrabold uppercase tracking-widest">{activeReel.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[9px] uppercase tracking-widest font-black px-2 py-0.5 rounded bg-secondary text-white">{activeReel.capacity}</span>
                    <span className="text-[9px] uppercase tracking-widest font-black px-2 py-0.5 rounded bg-accent text-white">{activeReel.savings}</span>
                  </div>
                </div>

                {/* Floating controls */}
                <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col gap-5 z-20">
                  <button 
                    onClick={(e) => { e.stopPropagation(); setIsMuted(!isMuted); }}
                    className="w-10 h-10 rounded-full bg-black/50 hover:bg-black/70 backdrop-blur-md text-white flex items-center justify-center transition-colors cursor-pointer border border-white/10"
                    title={isMuted ? "Unmute" : "Mute"}
                  >
                    {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                  </button>
                  <button 
                    onClick={(e) => { e.stopPropagation(); togglePlay(); }}
                    className="w-10 h-10 rounded-full bg-black/50 hover:bg-black/70 backdrop-blur-md text-white flex items-center justify-center transition-colors cursor-pointer border border-white/10"
                    title={isPlaying ? "Pause" : "Play"}
                  >
                    {isPlaying ? (
                      <span className="w-3.5 h-3.5 flex justify-center gap-1 items-center">
                        <span className="w-1 h-3 bg-white rounded-full"></span>
                        <span className="w-1 h-3 bg-white rounded-full"></span>
                      </span>
                    ) : (
                      <Play className="w-3.5 h-3.5 fill-white ml-0.5" />
                    )}
                  </button>
                </div>

                {/* Simulated Play overlay icon */}
                <AnimatePresence>
                  {!isPlaying && (
                    <motion.div 
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.8, opacity: 0 }}
                      className="absolute inset-0 flex items-center justify-center pointer-events-none bg-black/20"
                    >
                      <div className="w-16 h-16 rounded-full bg-black/60 flex items-center justify-center text-white border border-white/10 shadow-lg">
                        <Play className="w-6 h-6 fill-white ml-1" />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Feed Details & Interactivity Side (Right Side) */}
              <div className="flex-grow flex flex-col h-[40%] md:h-full bg-white">
                
                {/* Header (Username, verify badge) */}
                <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-full bg-primary/5 flex items-center justify-center font-bold text-xs text-primary border border-primary/10">
                      T
                    </div>
                    <div>
                      <div className="flex items-center gap-1">
                        <h4 className="text-xs font-bold text-primary">@{activeReel.username}</h4>
                        <CheckCircle className="w-3 h-3 text-secondary fill-secondary" />
                      </div>
                      <p className="text-[10px] text-slate-400 font-medium">Kashmir&apos;s Clean Energy Leader</p>
                    </div>
                  </div>
                  
                  <a 
                    href="https://wa.me/919541831565?text=Hi,%20I%20saw%20your%20customer%20reel%20from%20Nishat/Pahalgam.%20I%20want%20to%20know%20more%20about%20your%20solar%20installations." 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#25D366] hover:bg-[#20ba5a] text-white text-[10px] font-bold px-3 py-1.5 rounded-lg flex items-center gap-1 cursor-pointer transition-colors"
                  >
                    <span>WhatsApp Inquiry</span>
                  </a>
                </div>

                {/* Caption Description */}
                <div className="px-5 py-3.5 bg-slate-50 border-b border-slate-100/50">
                  <p className="text-[11px] text-slate-600 leading-relaxed font-medium">
                    {activeReel.caption}
                  </p>
                </div>

                {/* Comments Stream */}
                <div className="flex-grow overflow-y-auto px-5 py-3 space-y-3.5">
                  <div className="flex items-center gap-1.5 text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">
                    <MessageSquare className="w-3.5 h-3.5 text-secondary" />
                    <span>Real Comments from Locals</span>
                  </div>
                  
                  {(commentsList[activeReel.id] || []).map((comment, index) => (
                    <motion.div 
                      key={index}
                      initial={{ opacity: 0, x: -5 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className="flex gap-2.5 items-start text-[11px]"
                    >
                      <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center font-bold text-[9px] text-slate-500 uppercase shrink-0">
                        {comment.user.charAt(0)}
                      </div>
                      <div className="space-y-0.5">
                        <p className="leading-snug">
                          <span className="font-extrabold text-primary mr-1.5">@{comment.user}</span>
                          <span className="text-slate-600">{comment.text}</span>
                        </p>
                        <p className="text-[9px] text-slate-400 font-semibold">{comment.time}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Bottom Comments Input & Actions */}
                <div className="border-t border-slate-100 p-4 space-y-3 bg-white">
                  
                  {/* Quick comment input */}
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      placeholder="Add a comment..."
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      onKeyDown={(e) => { if (e.key === 'Enter') handleAddComment(activeReel.id); }}
                      className="flex-grow bg-slate-100 hover:bg-slate-200/60 focus:bg-slate-200/80 text-[11px] rounded-xl px-3.5 py-2 focus:outline-none transition-colors border border-transparent focus:border-slate-200"
                    />
                    <button 
                      onClick={() => handleAddComment(activeReel.id)}
                      className="p-2 bg-primary hover:bg-primary/95 text-white rounded-xl transition-colors cursor-pointer"
                    >
                      <Send className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Actions / Close */}
                  <div className="flex items-center justify-between text-xs pt-1.5 border-t border-slate-50">
                    <div className="flex items-center gap-3 text-slate-500 font-bold">
                      <span className="flex items-center gap-1 text-[11px]"><Heart className="w-4 h-4 text-secondary fill-secondary" /> {activeReel.likes}</span>
                      <span className="flex items-center gap-1 text-[11px]"><Share2 className="w-4 h-4" /> Share</span>
                    </div>
                    
                    <button 
                      onClick={() => setActiveReel(null)}
                      className="text-slate-400 hover:text-primary font-bold text-[11px] px-3.5 py-1.5 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer"
                    >
                      Close Player
                    </button>
                  </div>

                </div>

              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}

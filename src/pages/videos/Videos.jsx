import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Videos.css';

const Videos = () => {
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [selectedVideo, setSelectedVideo] = useState(null);
    const navigate = useNavigate();

    const API_BASE_URL = 'https://emereld-marketing.online/api';

    useEffect(() => {
        fetchVideos();
    }, []);

    const fetchVideos = async () => {
        try {
            setLoading(true);
            const response = await fetch(`${API_BASE_URL}/videos`);
            const data = await response.json();

            if (data.success) {
                setVideos(data.data);
            } else {
                setError('Failed to fetch videos');
            }
        } catch (error) {
            setError('Error fetching videos: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleBackClick = () => {
        navigate('/');
    };

    const handleVideoClick = (video) => {
        setSelectedVideo(video);
    };

    const closeVideoModal = () => {
        setSelectedVideo(null);
    };

    const getYouTubeEmbedUrl = (url) => {
        // Convert YouTube URL to embed URL
        const videoId = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/);
        return videoId ? `https://www.youtube.com/embed/${videoId[1]}` : url;
    };

    if (loading) {
        return (
            <div className="videos-page">
                <div className="loading-container">
                    <div className="loading-spinner"></div>
                    <p>جاري تحميل الفيديوهات...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="videos-page">
                <div className="error-container">
                    <h2>خطأ في التحميل</h2>
                    <p>{error}</p>
                    <button onClick={fetchVideos} className="retry-btn">إعادة المحاولة</button>
                </div>
            </div>
        );
    }

    return (
        <div className="videos-page">
            <div className="page-header">
                <button onClick={handleBackClick} className="back-btn">
                    ← العودة للرئيسية
                </button>
                <h1>فيديوهات السيارات</h1>
                <p>شاهد أحدث الفيديوهات عن السيارات الألمانية وقطع الغيار</p>
            </div>

            {videos.length === 0 ? (
                <div className="no-videos">
                    <h2>لا توجد فيديوهات متاحة حالياً</h2>
                    <p>سنقوم بإضافة فيديوهات جديدة قريباً</p>
                </div>
            ) : (
                <div className="videos-grid">
                    {videos.map((video) => (
                        <div key={video._id} className="video-card" onClick={() => handleVideoClick(video)}>
                            <div className="video-thumbnail">
                                <div className="play-button">
                                    <i className="play-icon">▶</i>
                                </div>
                                <div className="video-overlay">
                                    <span className="video-duration">10:30</span>
                                </div>
                            </div>
                            <div className="video-info">
                                <h3>{video.description}</h3>
                                <p className="video-date">
                                    {new Date(video.createdAt).toLocaleDateString('ar-EG')}
                                </p>
                                <div className="video-actions">
                                    <button className="watch-btn">مشاهدة</button>
                                    <button className="share-btn">مشاركة</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Video Modal */}
            {selectedVideo && (
                <div className="video-modal" onClick={closeVideoModal}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <button className="close-btn" onClick={closeVideoModal}>×</button>
                        <div className="video-container">
                            <iframe
                                src={getYouTubeEmbedUrl(selectedVideo.url)}
                                title={selectedVideo.description}
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        </div>
                        <div className="video-details">
                            <h3>{selectedVideo.description}</h3>
                            <p className="video-date">
                                {new Date(selectedVideo.createdAt).toLocaleDateString('ar-EG')}
                            </p>
                        </div>
                    </div>
                </div>
            )}

            <div className="contact-section">
                <h2>هل تريد إضافة فيديو؟</h2>
                <p>تواصل معنا لإضافة فيديوهات جديدة عن السيارات وقطع الغيار</p>
                <div className="contact-buttons">
                    <button className="primary-btn">اتصل بنا</button>
                    <button className="secondary-btn">راسلنا على واتساب</button>
                </div>
            </div>
        </div>
    );
};

export default Videos; 
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { FiShare2 } from 'react-icons/fi';
import './NewParts.css';

const NewParts = () => {
    const [parts, setParts] = useState([]);
    const [filteredParts, setFilteredParts] = useState([]);
    const [visibleCount, setVisibleCount] = useState(10);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const API_BASE_URL = 'https://emereld-marketing.online/api';

    useEffect(() => {
        fetchNewParts();
    }, []);
    useEffect(() => {
        // Scroll to top when component mounts
        window.scrollTo(0, 0);
    }, []);
    useEffect(() => {
        // Filter parts based on search term
        if (searchTerm.trim() === '') {
            setFilteredParts(parts);
        } else {
            const filtered = parts.filter(part =>
                part.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                part.brand?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                part.model?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                part.description?.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredParts(filtered);
        }
    }, [searchTerm, parts]);

    const fetchNewParts = async () => {
        try {
            setLoading(true);
            const response = await fetch(`${API_BASE_URL}/parts`);
            const data = await response.json();

            if (data.success) {
                // Filter parts with "new" status
                const newParts = data.data.filter(part => part.status === 'new');
                setParts(newParts);
                setFilteredParts(newParts);
            } else {
                setError('Failed to fetch parts');
            }
        } catch (error) {
            setError('Error fetching parts: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleBackClick = () => {
        navigate('/');
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const clearSearch = () => {
        setSearchTerm('');
    };

    const handleWhatsAppContact = (partName) => {
        const phoneNumber = '+201111132621'; // Replace with your actual WhatsApp number
        const message = `مرحبا، أنا مهتم بشراء ${partName} من قطع الغيار الجديدة. هل يمكنني الحصول على مزيد من المعلومات؟`;
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
    };

    const handleShare = (part) => {
        const shareUrl = `${window.location.origin}/product/${part._id}`;
        const shareTitle = part.name;
        const shareText = `شاهد ${part.name} - ${part.brand} ${part.model} - قطع غيار جديدة`;

        if (navigator.share) {
            navigator.share({
                title: shareTitle,
                text: shareText,
                url: shareUrl
            });
        } else {
            navigator.clipboard.writeText(shareUrl);

            // Show toast notification
            const toast = document.createElement('div');
            toast.textContent = 'تم نسخ الرابط إلى الحافظة';
            toast.style.position = 'fixed';
            toast.style.bottom = '20px';
            toast.style.left = '50%';
            toast.style.transform = 'translateX(-50%)';
            toast.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
            toast.style.color = 'white';
            toast.style.padding = '10px 20px';
            toast.style.borderRadius = '5px';
            toast.style.zIndex = '1000';
            toast.style.fontFamily = 'Cairo, sans-serif';

            document.body.appendChild(toast);

            setTimeout(() => {
                document.body.removeChild(toast);
            }, 3000);
        }
    };

    const loadMoreParts = () => {
        setVisibleCount(prevCount => prevCount + 10);
    };

    if (loading) {
        return (
            <div className="new-parts-page">
                <div className="loading-container">
                    <div className="loading-spinner"></div>
                    <p>جاري تحميل قطع الغيار الجديدة...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="new-parts-page">
                <div className="error-container">
                    <h2>خطأ في التحميل</h2>
                    <p>{error}</p>
                    <button onClick={fetchNewParts} className="retry-btn">إعادة المحاولة</button>
                </div>
            </div>
        );
    }

    return (
        <div className="new-parts-page">
            <div className="page-header">
                <button onClick={handleBackClick} className="back-btn">
                    ← العودة للرئيسية
                </button>
                <h1>قطع الغيار الجديدة</h1>
                <p>اكتشف مجموعتنا المميزة من قطع الغيار الجديدة عالية الجودة</p>
            </div>

            {/* Search Bar */}
            <div className="search-container">
                <div className="search-box">
                    <input
                        type="text"
                        placeholder="ابحث عن قطع الغيار بالاسم أو الماركة أو الموديل أو الوصف..."
                        value={searchTerm}
                        onChange={handleSearchChange}
                        className="search-input"
                    />
                    {searchTerm && (
                        <button onClick={clearSearch} className="clear-search-btn">
                            ✕
                        </button>
                    )}
                </div>
                {searchTerm && (
                    <div className="search-results-info">
                        <span>تم العثور على {filteredParts.length} نتيجة</span>
                    </div>
                )}
            </div>

            {filteredParts.length === 0 ? (
                <div className="no-parts">
                    {searchTerm ? (
                        <>
                            <h2>لا توجد نتائج للبحث</h2>
                            <p>جرب البحث بكلمات مختلفة أو امسح البحث للعودة لجميع قطع الغيار</p>
                            <button onClick={clearSearch} className="clear-all-btn">مسح البحث</button>
                        </>
                    ) : (
                        <>
                            <h2>لا توجد قطع غيار جديدة متاحة حالياً</h2>
                            <p>سنقوم بإضافة قطع غيار جديدة قريباً</p>
                        </>
                    )}
                </div>
            ) : (
                <div>
                    <div className="parts-grid">
                        {/* Show all results when searching, otherwise show only the visible count */}
                        {(searchTerm ? filteredParts : filteredParts.slice(0, visibleCount)).map((part) => (
                            <div key={part._id} className="part-card">
                                <div
                                    className="part-image-new"
                                    onClick={() => navigate(`/product/${part._id}`)}
                                    style={{ cursor: 'pointer' }}
                                >
                                    <img src={part.imageUrl} alt={part.name} />
                                    <div className="status-badge new">جديد</div>
                                </div>
                                <div className="part-info">
                                    <h3
                                        onClick={() => navigate(`/product/${part._id}`)}
                                        style={{ cursor: 'pointer' }}
                                    >
                                        {part.name}
                                    </h3>
                                    <p className="brand-model">{part.brand} - {part.model}</p>
                                    <p className="description">{part.description}</p>
                                    <div className="price-section">
                                        <span className="price">{part.price} جنيه</span>
                                    </div>
                                    <div className="part-actions">
                                        <div className="action-buttons-row">
                                            <button
                                                className="details-btn"
                                                onClick={() => navigate(`/product/${part._id}`)}
                                            >
                                                عرض التفاصيل
                                            </button>
                                            <button
                                                onClick={() => handleShare(part)}
                                                className="share-btn"
                                                aria-label="مشاركة المنتج"
                                            >
                                                <FiShare2 className="share-icon" />
                                                مشاركة
                                            </button>
                                        </div>
                                        <button
                                            className="contact-btn"
                                            onClick={() => handleWhatsAppContact(part.name)}
                                        >
                                            <FontAwesomeIcon icon={faWhatsapp} className="whatsapp-icon" />
                                            شراء الان عبر الواتساب
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Show "Load More" button only when not searching and there are more items to show */}
                    {!searchTerm && filteredParts.length > visibleCount && (
                        <div className="load-more-container">
                            <button onClick={loadMoreParts} className="load-more-btn">
                                عرض المزيد من المنتجات
                            </button>
                        </div>
                    )}
                </div>
            )}

            <div className="contact-section">
                <h2>هل تحتاج مساعدة؟</h2>
                <p>تواصل معنا للحصول على استشارة مجانية حول قطع الغيار المناسبة لسيارتك</p>
                <div className="contact-buttons">
                    <button className="primary-btn">اتصل بنا</button>
                    <button className="secondary-btn">راسلنا على واتساب</button>
                </div>
            </div>
        </div>
    );
};

export default NewParts;

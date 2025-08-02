import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './NewParts.css';

const NewParts = () => {
    const [parts, setParts] = useState([]);
    const [filteredParts, setFilteredParts] = useState([]);
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
                <div className="parts-grid">
                    {filteredParts.map((part) => (
                        <div key={part._id} className="part-card">
                            <div className="part-image-new">
                                <img src={part.imageUrl} alt={part.name} />
                                <div className="status-badge new">جديد</div>
                            </div>
                            <div className="part-info">
                                <h3>{part.name}</h3>
                                <p className="brand-model">{part.brand} - {part.model}</p>
                                <p className="description">{part.description}</p>
                                <div className="price-section">
                                    <span className="price">{part.price} جنيه</span>
                                </div>
                                <div className="part-actions">
                                    <button className="contact-btn">تواصل معنا</button>
                                    <button className="whatsapp-btn">واتساب</button>
                                </div>
                            </div>
                        </div>
                    ))}
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

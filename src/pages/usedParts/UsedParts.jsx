import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './UsedParts.css';

const UsedParts = () => {
    const [parts, setParts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const API_BASE_URL = 'http://localhost:5000/api';

    useEffect(() => {
        fetchUsedParts();
    }, []);

    const fetchUsedParts = async () => {
        try {
            setLoading(true);
            const response = await fetch(`${API_BASE_URL}/parts`);
            const data = await response.json();

            if (data.success) {
                // Filter parts with "used" status
                const usedParts = data.data.filter(part => part.status === 'used');
                setParts(usedParts);
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

    if (loading) {
        return (
            <div className="used-parts-page">
                <div className="loading-container">
                    <div className="loading-spinner"></div>
                    <p>جاري تحميل قطع الغيار الاستيراد...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="used-parts-page">
                <div className="error-container">
                    <h2>خطأ في التحميل</h2>
                    <p>{error}</p>
                    <button onClick={fetchUsedParts} className="retry-btn">إعادة المحاولة</button>
                </div>
            </div>
        );
    }

    return (
        <div className="used-parts-page">
            <div className="page-header">
                <button onClick={handleBackClick} className="back-btn">
                    ← العودة للرئيسية
                </button>
                <h1>قطع الغيار الاستيراد</h1>
                <p>اكتشف مجموعتنا المميزة من قطع الغيار الاستيراد عالية الجودة بأسعار مناسبة</p>
            </div>

            {parts.length === 0 ? (
                <div className="no-parts">
                    <h2>لا توجد قطع غيار استيراد متاحة حالياً</h2>
                    <p>سنقوم بإضافة قطع غيار استيراد قريباً</p>
                </div>
            ) : (
                <div className="parts-grid">
                    {parts.map((part) => (
                        <div key={part._id} className="part-card">
                            <div className="part-image-used">
                                <img src={part.imageUrl} alt={part.name} />
                                <div className="status-badge used">مستعمل</div>
                            </div>
                            <div className="part-info">
                                <h3>{part.name}</h3>
                                <p className="brand-model">{part.brand} - {part.model}</p>
                                <p className="description">{part.description}</p>
                                <div className="price-section">
                                    <span className="price">{part.price} جنيه</span>
                                    <span className="discount-badge">خصم</span>
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
                <p>تواصل معنا للحصول على استشارة مجانية حول قطع الغيار الاستيراد المناسبة لسيارتك</p>
                <div className="contact-buttons">
                    <button className="primary-btn">اتصل بنا</button>
                    <button className="secondary-btn">راسلنا على واتساب</button>
                </div>
            </div>
        </div>
    );
};

export default UsedParts;

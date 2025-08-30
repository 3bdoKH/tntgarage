import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import './ProductDetails.css';

const ProductDetails = () => {
    const [part, setPart] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const { id } = useParams();
    const navigate = useNavigate();

    const API_BASE_URL = 'https://emereld-marketing.online/api';

    useEffect(() => {
        fetchPartDetails();
        // Scroll to top when component mounts
        window.scrollTo(0, 0);
    }, [id]);

    const fetchPartDetails = async () => {
        try {
            setLoading(true);
            const response = await fetch(`${API_BASE_URL}/parts/${id}`);
            const data = await response.json();

            if (data.success) {
                setPart(data.data);
            } else {
                setError('Failed to fetch part details');
            }
        } catch (error) {
            setError('Error fetching part details: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleBackClick = () => {
        navigate(-1); // Go back to previous page
    };

    const handleWhatsAppContact = () => {
        if (!part) return;
        
        const phoneNumber = '+201111132621'; // Replace with your actual WhatsApp number
        const status = part.status === 'new' ? 'الجديدة' : 'الاستيراد';
        const message = `مرحبا، أنا مهتم بشراء ${part.name} من قطع الغيار ${status}. هل يمكنني الحصول على مزيد من المعلومات؟`;
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
    };

    if (loading) {
        return (
            <div className="product-details-page">
                <div className="loading-container">
                    <div className="loading-spinner"></div>
                    <p>جاري تحميل تفاصيل المنتج...</p>
                </div>
            </div>
        );
    }

    if (error || !part) {
        return (
            <div className="product-details-page">
                <div className="error-container">
                    <h2>خطأ في التحميل</h2>
                    <p>{error || 'لم يتم العثور على المنتج'}</p>
                    <button onClick={handleBackClick} className="retry-btn">العودة للخلف</button>
                </div>
            </div>
        );
    }

    return (
        <div className="product-details-page">
            <div className="page-header">
                <button onClick={handleBackClick} className="back-btn">
                    ← العودة للخلف
                </button>
                <h1>تفاصيل المنتج</h1>
            </div>

            <div className="product-details-container">
                <div className="product-image-container">
                    <img src={part.imageUrl} alt={part.name} className="product-image" />
                    <div className={`status-badge ${part.status === 'new' ? 'new' : 'used'}`}>
                        {part.status === 'new' ? 'جديد' : 'مستعمل'}
                    </div>
                </div>

                <div className="product-info-container">
                    <h2 className="product-name">{part.name}</h2>
                    <p className="product-brand-model">{part.brand} - {part.model}</p>
                    
                    <div className="product-price-section">
                        <span className="product-price">{part.price} جنيه</span>
                        {part.status === 'used' && <span className="discount-badge">خصم</span>}
                    </div>

                    <div className="product-description-section">
                        <h3>الوصف</h3>
                        <p className="product-description">{part.description}</p>
                    </div>

                    <div className="product-specs-section">
                        <h3>المواصفات</h3>
                        <ul className="product-specs-list">
                            {part.brand && <li><span>الماركة:</span> {part.brand}</li>}
                            {part.model && <li><span>الموديل:</span> {part.model}</li>}
                            {part.year && <li><span>سنة الصنع:</span> {part.year}</li>}
                            {part.condition && <li><span>الحالة:</span> {part.condition}</li>}
                        </ul>
                    </div>

                    <div className="product-actions">
                        <button
                            className="contact-btn"
                            onClick={handleWhatsAppContact}
                        >
                            <FontAwesomeIcon icon={faWhatsapp} className="whatsapp-icon" />
                            شراء الان عبر الواتساب
                        </button>
                    </div>
                </div>
            </div>

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

export default ProductDetails;

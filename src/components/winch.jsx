import React from 'react'
import './winch.css'
import { useNavigate } from 'react-router-dom'

const Winch = () => {
    const navigate = useNavigate()
    
    return (
        <div className='winch-container' onClick={() => navigate('/winch')}>
            <div className="winch-overlay">
                <div className="winch-content">
                    <div className="winch-icon">🚗</div>
                    <h1 className="winch-title">ونش انقاذ</h1>
                    <p className="winch-description">
                        لو عربيتك عطلت اتصل بنا
                        <br />
                        نبعتلك ونش مجانا تابع لوزاره الخارجيه
                        <br />
                        في حاله الإصلاح في المركز
                    </p>
                    <div className="winch-features">
                        <span className="feature">🚗 خدمة مجانية</span>
                        <span className="feature">⚡ استجابة سريعة</span>
                        <span className="feature">🔧 إصلاح في المركز</span>
                    </div>
                    <button className="winch-btn">
                        طلب ونش الآن
                        <span className="btn-arrow">→</span>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Winch

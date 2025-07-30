import React, { useState } from 'react'
import './Form.css'

const Form = () => {
    const [formData, setFormData] = useState({
        name: '',
        contactNumber: '',
        carType: '',
        carBrand: '',
        carModel: '',
        year: '',
        transmission: ''
    })

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        
        // WhatsApp number (you can change this to your desired number)
        const whatsappNumber = '+201091094406' // Replace with your actual WhatsApp number
        
        // Format the message in Arabic
        const message = `مرحباً، أريد حجز موعد

البيانات الشخصية:
الاسم: ${formData.name}
رقم الهاتف: ${formData.contactNumber}

بيانات السيارة:
نوع السيارة: ${formData.carType}
ماركة السيارة: ${formData.carBrand}
موديل السيارة: ${formData.carModel}
سنة الصنع: ${formData.year}
نوع ناقل الحركة: ${formData.transmission}

شكراً لكم`

        // Encode the message for URL
        const encodedMessage = encodeURIComponent(message)
        
        // Create WhatsApp URL
        const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`
        
        // Open WhatsApp in new tab
        window.open(whatsappURL, '_blank')
        
        // Optional: Reset form after sending
        setFormData({
            name: '',
            contactNumber: '',
            carType: '',
            carBrand: '',
            carModel: '',
            year: '',
            transmission: ''
        })
    }

    return (
        <div className="form-split-container">
            <div className="image-section">
                <img src={require('./form.png')} alt="Car Form" className="form-image" />
            </div>
            
            <div className="form-section">
                <form className="car-form" onSubmit={handleSubmit}>
                    <h1 className="form-title">أدخل بيانات سيارتك</h1>
                    
                    <div className="form-group">
                        <label>الاسم الكامل</label>
                        <div className="input-wrapper">
                            <input 
                                type="text" 
                                name="name" 
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="أدخل اسمك الكامل"
                                required
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label>رقم الهاتف</label>
                        <div className="input-wrapper">
                            <input 
                                type="tel" 
                                name="contactNumber" 
                                value={formData.contactNumber}
                                onChange={handleChange}
                                placeholder="أدخل رقم الهاتف"
                                required
                                style={{direction: 'rtl'}}
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label>إختر نوع السيارة</label>
                        <div className="input-wrapper">
                            <input 
                                type="text" 
                                name="carType" 
                                value={formData.carType}
                                onChange={handleChange}
                                placeholder="أدخل نوع السيارة"
                                required
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label>إختر ماركة السيارة</label>
                        <div className="input-wrapper">
                            <input 
                                type="text" 
                                name="carBrand" 
                                value={formData.carBrand}
                                onChange={handleChange}
                                placeholder="أدخل ماركة السيارة"
                                required
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label>إختر موديل السيارة</label>
                        <div className="input-wrapper">
                            <input 
                                type="text" 
                                name="carModel" 
                                value={formData.carModel}
                                onChange={handleChange}
                                placeholder="أدخل موديل السيارة"
                                required
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label>إختر سنة الصنع</label>
                        <div className="input-wrapper">
                            <input 
                                type="text" 
                                name="year" 
                                value={formData.year}
                                onChange={handleChange}
                                placeholder="أدخل سنة الصنع"
                                required
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label>إختر نوع ناقل الحركة</label>
                        <div className="input-wrapper">
                            <input 
                                type="text" 
                                name="transmission" 
                                value={formData.transmission}
                                onChange={handleChange}
                                placeholder="أدخل نوع ناقل الحركة"
                                required
                            />
                        </div>
                    </div>

                    <button type="submit" className="search-btn">
                    حجز موعد
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Form

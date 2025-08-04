import React, { useState } from 'react'
import './CheckForm.css'

const CheckForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        contactNumber: '',
        carType: '',
        carModel: '',
        year: '',
        transmission: '',
        inspectionType: '',
        currentMileage: '',
        lastServiceDate: '',
        issues: ''
    })

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        const whatsappNumber = '+201111132621'
        const message = `مرحباً، أريد حجز موعد فحص السيارة

                        البيانات الشخصية:
                        الاسم: ${formData.name}
                        رقم الهاتف: ${formData.contactNumber}
                        
                        بيانات السيارة:
                        نوع السيارة: ${formData.carType}
                        موديل السيارة: ${formData.carModel}
                        سنة الصنع: ${formData.year}
                        نوع ناقل الحركة: ${formData.transmission}
                        
                        معلومات الفحص:
                        نوع الفحص المطلوب: ${formData.inspectionType}
                        عدد الكيلومترات الحالي: ${formData.currentMileage}
                        تاريخ آخر صيانة: ${formData.lastServiceDate}
                        المشاكل الحالية: ${formData.issues}

                        شكراً لكم`

        const encodedMessage = encodeURIComponent(message)

        const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`

        window.open(whatsappURL, '_blank')

        setFormData({
            name: '',
            contactNumber: '',
            carType: '',
            carModel: '',
            year: '',
            transmission: '',
            inspectionType: '',
            currentMileage: '',
            lastServiceDate: '',
            issues: ''
        })
    }

    return (
        <div className="check-form-split-container" id="check-form">

            <div className="check-form-section">
                <form className="inspection-form" onSubmit={handleSubmit}>
                    <h1 className="check-form-title">حجز موعد فحص السيارة</h1>

                    <div className="check-form-group">
                        <label>الاسم الكامل</label>
                        <div className="check-input-wrapper">
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

                    <div className="check-form-group">
                        <label>رقم الهاتف</label>
                        <div className="check-input-wrapper">
                            <input
                                type="tel"
                                name="contactNumber"
                                value={formData.contactNumber}
                                onChange={handleChange}
                                placeholder="أدخل رقم الهاتف"
                                required
                                style={{ direction: 'rtl' }}
                            />
                        </div>
                    </div>

                    <div className="check-form-group">
                        <label>نوع السيارة</label>
                        <div className="check-input-wrapper">
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

                    <div className="check-form-group">
                        <label>موديل السيارة</label>
                        <div className="check-input-wrapper">
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

                    <div className="check-form-group">
                        <label>سنة الصنع</label>
                        <div className="check-input-wrapper">
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

                    <div className="check-form-group">
                        <label>نوع ناقل الحركة</label>
                        <div className="check-input-wrapper">
                            <select name="transmission" value={formData.transmission} onChange={handleChange} required>
                                <option value="">اختر نوع ناقل الحركة</option>
                                <option value="automatic">اوتوماتيك</option>
                                <option value="manual">يدوي</option>
                            </select>
                        </div>
                    </div>

                    <div className="check-form-group">
                        <label>نوع الفحص المطلوب</label>
                        <div className="check-input-wrapper">
                            <select name="inspectionType" value={formData.inspectionType} onChange={handleChange} required>
                                <option value="">اختر نوع الفحص</option>
                                <option value="general">فحص عام شامل</option>
                                <option value="engine">فحص المحرك</option>
                                <option value="brakes">فحص الفرامل</option>
                                <option value="electrical">فحص الكهرباء</option>
                                <option value="suspension">فحص التعليق</option>
                                <option value="diagnostic">فحص تشخيصي</option>
                            </select>
                        </div>
                    </div>

                    <div className="check-form-group">
                        <label>عدد الكيلومترات الحالي</label>
                        <div className="check-input-wrapper">
                            <input
                                type="text"
                                name="currentMileage"
                                value={formData.currentMileage}
                                onChange={handleChange}
                                placeholder="أدخل عدد الكيلومترات"
                                required
                            />
                        </div>
                    </div>

                    <div className="check-form-group">
                        <label>تاريخ آخر صيانة</label>
                        <div className="check-input-wrapper">
                            <input
                                type="date"
                                name="lastServiceDate"
                                value={formData.lastServiceDate}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    <div className="check-form-group">
                        <label>المشاكل الحالية (اختياري)</label>
                        <div className="check-input-wrapper">
                            <textarea
                                name="issues"
                                value={formData.issues}
                                onChange={handleChange}
                                placeholder="اشرح المشاكل التي تواجهها مع السيارة"
                                rows="3"
                            />
                        </div>
                    </div>

                    <button type="submit" className="check-search-btn">
                        حجز موعد الفحص
                    </button>
                </form>
            </div>
            <div className="check-image-section">
                <img src={require('./form.png')} alt="Car Inspection" className="check-form-image" />
            </div>
        </div>
    )
}

export default CheckForm

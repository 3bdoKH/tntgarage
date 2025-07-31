import React, { useState, useEffect } from 'react';
import './AdminDashboard.css';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('parts');
    const [parts, setParts] = useState([]);
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // Form states for parts
    const [partForm, setPartForm] = useState({
        name: '',
        price: '',
        description: '',
        brand: '',
        model: '',
        imageUrl: '',
        status: 'new'
    });
    const [editingPart, setEditingPart] = useState(null);

    // Form states for videos
    const [videoForm, setVideoForm] = useState({
        url: '',
        description: ''
    });
    const [editingVideo, setEditingVideo] = useState(null);

    const API_BASE_URL = 'https://emereld-marketing.online/api';

    // Fetch data functions
    const fetchParts = async () => {
        try {
            setLoading(true);
            const response = await fetch(`${API_BASE_URL}/parts`);
            const data = await response.json();
            if (data.success) {
                setParts(data.data);
            } else {
                setError('Failed to fetch parts');
            }
        } catch (error) {
            setError('Error fetching parts: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

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

    useEffect(() => {
        fetchParts();
        fetchVideos();
    }, []);

    const handlePartSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const url = editingPart
                ? `${API_BASE_URL}/parts/${editingPart._id}`
                : `${API_BASE_URL}/parts`;

            const method = editingPart ? 'PUT' : 'POST';

            const requestData = {
                ...partForm,
                price: Number(partForm.price)
            };

            console.log('Sending part data:', requestData);

            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestData),
            });

            const data = await response.json();
            console.log('Response from server:', data);

            if (data.success) {
                setPartForm({ name: '', price: '', description: '', brand: '', model: '', imageUrl: '', status: 'new' });
                setEditingPart(null);
                fetchParts();
                setError('');
            } else {
                setError(data.message);
            }
        } catch (error) {
            setError('Error saving part: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    const handlePartEdit = (part) => {
        setEditingPart(part);
        setPartForm({
            name: part.name,
            price: part.price.toString(),
            description: part.description,
            brand: part.brand,
            model: part.model,
            imageUrl: part.imageUrl,
            status: part.status
        });
    };

    const handlePartDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this part?')) {
            try {
                setLoading(true);
                const response = await fetch(`${API_BASE_URL}/parts/${id}`, {
                    method: 'DELETE',
                });

                const data = await response.json();

                if (data.success) {
                    fetchParts();
                    setError('');
                } else {
                    setError(data.message);
                }
            } catch (error) {
                setError('Error deleting part: ' + error.message);
            } finally {
                setLoading(false);
            }
        }
    };

    // Videos CRUD operations
    const handleVideoSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);

            // Convert Streamable URL to embed format if needed
            let processedUrl = videoForm.url;
            if (processedUrl.includes('streamable.com/') && !processedUrl.includes('streamable.com/e/')) {
                // Extract video ID from streamable URL
                const videoId = processedUrl.split('streamable.com/')[1].split('?')[0];
                processedUrl = `https://streamable.com/e/${videoId}`;
                console.log('Converted Streamable URL:', processedUrl);
            }

            const url = editingVideo
                ? `${API_BASE_URL}/videos/${editingVideo._id}`
                : `${API_BASE_URL}/videos`;

            const method = editingVideo ? 'PUT' : 'POST';

            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...videoForm,
                    url: processedUrl
                }),
            });

            const data = await response.json();

            if (data.success) {
                setVideoForm({ url: '', description: '' });
                setEditingVideo(null);
                fetchVideos();
                setError('');
            } else {
                setError(data.message);
            }
        } catch (error) {
            setError('Error saving video: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleVideoEdit = (video) => {
        setEditingVideo(video);
        setVideoForm({
            url: video.url,
            description: video.description
        });
    };

    const handleVideoDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this video?')) {
            try {
                setLoading(true);
                const response = await fetch(`${API_BASE_URL}/videos/${id}`, {
                    method: 'DELETE',
                });

                const data = await response.json();

                if (data.success) {
                    fetchVideos();
                    setError('');
                } else {
                    setError(data.message);
                }
            } catch (error) {
                setError('Error deleting video: ' + error.message);
            } finally {
                setLoading(false);
            }
        }
    };

    const cancelEdit = () => {
        setEditingPart(null);
        setEditingVideo(null);
        setPartForm({ name: '', price: '', description: '', brand: '', model: '', imageUrl: '', status: 'new' });
        setVideoForm({ url: '', description: '' });
    };

    return (
        <div className="admin-dashboard">
            <div className="admin-header">
                <h1>Admin Dashboard</h1>
                <button className="back-btn" onClick={() => navigate('/')}>
                    <span className="btn-arrow">←</span>
                    العودة للرئيسية
                </button>
            </div>

            {error && (
                <div className="error-message">
                    {error}
                    <button onClick={() => setError('')}>×</button>
                </div>
            )}

            <div className="tab-container">
                <div className="tab-buttons">
                    <button
                        className={`tab-btn ${activeTab === 'parts' ? 'active' : ''}`}
                        onClick={() => setActiveTab('parts')}
                    >
                        قطع الغيار
                    </button>
                    <button
                        className={`tab-btn ${activeTab === 'videos' ? 'active' : ''}`}
                        onClick={() => setActiveTab('videos')}
                    >
                        الفيديوهات
                    </button>
                </div>

                {activeTab === 'parts' && (
                    <div className="tab-content">
                        <div className="form-section-admin">
                            <h2>{editingPart ? 'تعديل قطعة غيار' : 'إضافة قطعة غيار جديدة'}</h2>
                            <form onSubmit={handlePartSubmit} className="admin-form">
                                <div className="form-group-admin">
                                    <label>الاسم:</label>
                                    <input
                                        type="text"
                                        value={partForm.name}
                                        onChange={(e) => setPartForm({ ...partForm, name: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className="form-group-admin">
                                    <label>السعر:</label>
                                    <input
                                        type="number"
                                        value={partForm.price}
                                        onChange={(e) => setPartForm({ ...partForm, price: e.target.value })}
                                        required
                                        min="0"
                                    />
                                </div>
                                <div className="form-group-admin">
                                    <label>الوصف:</label>
                                    <textarea
                                        value={partForm.description}
                                        onChange={(e) => setPartForm({ ...partForm, description: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className="form-group-admin">
                                    <label>الماركة:</label>
                                    <input
                                        type="text"
                                        value={partForm.brand}
                                        onChange={(e) => setPartForm({ ...partForm, brand: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className="form-group-admin">
                                    <label>الموديل:</label>
                                    <input
                                        type="text"
                                        value={partForm.model}
                                        onChange={(e) => setPartForm({ ...partForm, model: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className="form-group-admin">
                                    <label>رابط الصورة:</label>
                                    <input
                                        type="url"
                                        value={partForm.imageUrl}
                                        onChange={(e) => setPartForm({ ...partForm, imageUrl: e.target.value })}
                                        required
                                        placeholder="https://example.com/image.jpg"
                                    />
                                </div>
                                <div className="form-group-admin">
                                    <label>الحالة:</label>
                                    <select
                                        value={partForm.status}
                                        onChange={(e) => setPartForm({ ...partForm, status: e.target.value })}
                                        required
                                    >
                                        <option value="new">جديد</option>
                                        <option value="used">مستعمل</option>
                                    </select>
                                </div>
                                <div className="form-buttons">
                                    <button type="submit" disabled={loading}>
                                        {loading ? 'جاري الحفظ...' : (editingPart ? 'تحديث' : 'إضافة')}
                                    </button>
                                    {editingPart && (
                                        <button type="button" onClick={cancelEdit}>
                                            إلغاء
                                        </button>
                                    )}
                                </div>
                            </form>
                        </div>

                        <div className="data-section">
                            <h2>قطع الغيار ({parts.length})</h2>
                            {loading ? (
                                <div className="loading">جاري التحميل...</div>
                            ) : (
                                <div className="data-grid">
                                    {parts.map((part) => (
                                        <div key={part._id} className="data-card">
                                            <div className="part-image">
                                                <img src={part.imageUrl} alt={part.name} />
                                                {
                                                    console.log(part.imageUrl)
                                                }
                                            </div>
                                            <h3>{part.name}</h3>
                                            <p><strong>السعر:</strong> {part.price} جنيه</p>
                                            <p><strong>الماركة:</strong> {part.brand}</p>
                                            <p><strong>الموديل:</strong> {part.model}</p>
                                            <p><strong>الحالة:</strong> <span className={`status ${part.status}`}>{part.status === 'new' ? 'جديد' : 'مستعمل'}</span></p>
                                            <p><strong>الوصف:</strong> {part.description}</p>
                                            <div className="card-actions">
                                                <button onClick={() => handlePartEdit(part)}>تعديل</button>
                                                <button onClick={() => handlePartDelete(part._id)} className="delete-btn">حذف</button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {activeTab === 'videos' && (
                    <div className="tab-content">
                        <div className="form-section-admin">
                            <h2>{editingVideo ? 'تعديل فيديو' : 'إضافة فيديو جديد'}</h2>
                            <form onSubmit={handleVideoSubmit} className="admin-form">
                                <div className="form-group-admin">
                                    <label>رابط الفيديو:</label>
                                    <input
                                        type="url"
                                        value={videoForm.url}
                                        onChange={(e) => setVideoForm({ ...videoForm, url: e.target.value })}
                                        required
                                        placeholder="https://www.youtube.com/watch?v=..."
                                    />
                                </div>
                                <div className="form-group-admin">
                                    <label>الوصف:</label>
                                    <textarea
                                        value={videoForm.description}
                                        onChange={(e) => setVideoForm({ ...videoForm, description: e.target.value })}
                                        placeholder="وصف الفيديو..."
                                    />
                                </div>
                                <div className="form-buttons">
                                    <button type="submit" disabled={loading}>
                                        {loading ? 'جاري الحفظ...' : (editingVideo ? 'تحديث' : 'إضافة')}
                                    </button>
                                    {editingVideo && (
                                        <button type="button" onClick={cancelEdit}>
                                            إلغاء
                                        </button>
                                    )}
                                </div>
                            </form>
                        </div>

                        <div className="data-section">
                            <h2>الفيديوهات ({videos.length})</h2>
                            {loading ? (
                                <div className="loading">جاري التحميل...</div>
                            ) : (
                                <div className="data-grid">
                                    {videos.map((video) => (
                                        <div key={video._id} className="data-card">
                                            <h3>فيديو</h3>
                                            <p><strong>الرابط:</strong> {video.url}</p>
                                            <p><strong>الوصف:</strong> {video.description || 'لا يوجد وصف'}</p>
                                            <div className="card-actions">
                                                <button onClick={() => handleVideoEdit(video)}>تعديل</button>
                                                <button onClick={() => handleVideoDelete(video._id)} className="delete-btn">حذف</button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminDashboard; 
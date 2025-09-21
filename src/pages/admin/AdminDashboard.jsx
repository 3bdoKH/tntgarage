import React, { useState, useEffect } from 'react';
import './AdminDashboard.css';
import { useNavigate } from 'react-router-dom';
import { articlesAPI } from '../../utils/api';

const AdminDashboard = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('parts');
    const [parts, setParts] = useState([]);
    const [videos, setVideos] = useState([]);
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [adminUser, setAdminUser] = useState('');

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

    // Form states for articles
    const [articleForm, setArticleForm] = useState({
        title: '',
        description: '',
        imageUrl: '',
        author: '',
        published: false,
        tags: '',
        sections: []
    });
    const [editingArticle, setEditingArticle] = useState(null);
    const [sectionForm, setSectionForm] = useState({
        heading: '',
        paragraph: ''
    });

    const API_BASE_URL = 'https://emereld-marketing.online/api';

    useEffect(() => {
        // Get admin user info
        const user = localStorage.getItem('adminUser');
        if (user) {
            setAdminUser(user);
        }

        fetchParts();
        fetchVideos();
        fetchArticles();
    }, []);

    const handleLogout = () => {
        // Clear authentication data
        localStorage.removeItem('adminToken');
        localStorage.removeItem('adminUser');

        // Redirect to login
        navigate('/admin-login');
    };

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

    const fetchArticles = async () => {
        try {
            setLoading(true);
            const data = await articlesAPI.getAllArticles();
            if (data.success) {
                setArticles(data.data);
            } else {
                setError('Failed to fetch articles');
            }
        } catch (error) {
            setError('Error fetching articles: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

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
        if (window.confirm('هل أنت متأكد من حذف هذا الجزء؟')) {
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
                    setError('Failed to delete part');
                }
            } catch (error) {
                setError('Error deleting part: ' + error.message);
            } finally {
                setLoading(false);
            }
        }
    };

    const handleVideoSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const url = editingVideo
                ? `${API_BASE_URL}/videos/${editingVideo._id}`
                : `${API_BASE_URL}/videos`;

            const method = editingVideo ? 'PUT' : 'POST';

            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(videoForm),
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
        if (window.confirm('هل أنت متأكد من حذف هذا الفيديو؟')) {
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
                    setError('Failed to delete video');
                }
            } catch (error) {
                setError('Error deleting video: ' + error.message);
            } finally {
                setLoading(false);
            }
        }
    };

    // Article handlers
    const handleArticleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);

            const articleData = {
                ...articleForm,
                tags: articleForm.tags ? articleForm.tags.split(',').map(tag => tag.trim()) : [],
                sections: articleForm.sections
            };

            const data = editingArticle
                ? await articlesAPI.updateArticle(editingArticle._id, articleData)
                : await articlesAPI.createArticle(articleData);

            if (data.success) {
                setArticleForm({ title: '', description: '', imageUrl: '', author: '', published: false, tags: '', sections: [] });
                setEditingArticle(null);
                fetchArticles();
                setError('');
            } else {
                setError(data.message);
            }
        } catch (error) {
            setError('Error saving article: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleArticleEdit = (article) => {
        setEditingArticle(article);
        setArticleForm({
            title: article.title,
            description: article.description,
            imageUrl: article.imageUrl || '',
            author: article.author,
            published: article.published,
            tags: article.tags ? article.tags.join(', ') : '',
            sections: article.sections || []
        });
    };

    const handleArticleDelete = async (id) => {
        if (window.confirm('هل أنت متأكد من حذف هذا المقال؟')) {
            try {
                setLoading(true);
                const data = await articlesAPI.deleteArticle(id);
                if (data.success) {
                    fetchArticles();
                    setError('');
                } else {
                    setError('Failed to delete article');
                }
            } catch (error) {
                setError('Error deleting article: ' + error.message);
            } finally {
                setLoading(false);
            }
        }
    };

    const addSection = () => {
        if (sectionForm.heading && sectionForm.paragraph) {
            const newSection = {
                heading: sectionForm.heading,
                paragraph: sectionForm.paragraph
            };
            setArticleForm({
                ...articleForm,
                sections: [...articleForm.sections, newSection]
            });
            setSectionForm({ heading: '', paragraph: '' });
        }
    };

    const removeSection = (index) => {
        const updatedSections = articleForm.sections.filter((_, i) => i !== index);
        setArticleForm({ ...articleForm, sections: updatedSections });
    };

    const cancelEdit = () => {
        setEditingPart(null);
        setEditingVideo(null);
        setEditingArticle(null);
        setPartForm({ name: '', price: '', description: '', brand: '', model: '', imageUrl: '', status: 'new' });
        setVideoForm({ url: '', description: '' });
        setArticleForm({ title: '', description: '', imageUrl: '', author: '', published: false, tags: '', sections: [] });
        setSectionForm({ heading: '', paragraph: '' });
    };

    return (
        <div className="admin-dashboard">
            <div className="dashboard-header">
                <div className="header-content">
                    <h1>لوحة تحكم المدير</h1>
                    <div className="user-info">
                        <span>مرحباً، {adminUser}</span>
                        <button onClick={handleLogout} className="logout-btn">
                            تسجيل الخروج
                        </button>
                    </div>
                </div>
            </div>

            <div className="dashboard-content">
                <div className="tabs">
                    <button
                        className={`tab ${activeTab === 'parts' ? 'active' : ''}`}
                        onClick={() => setActiveTab('parts')}
                    >
                        قطع الغيار
                    </button>
                    <button
                        className={`tab ${activeTab === 'videos' ? 'active' : ''}`}
                        onClick={() => setActiveTab('videos')}
                    >
                        الفيديوهات
                    </button>
                    <button
                        className={`tab ${activeTab === 'articles' ? 'active' : ''}`}
                        onClick={() => setActiveTab('articles')}
                    >
                        المقالات
                    </button>
                </div>

                {error && (
                    <div className="error-message">
                        {error}
                    </div>
                )}

                {activeTab === 'parts' && (
                    <div className="tab-content">
                        <h2>{editingPart ? 'تعديل قطعة غيار' : 'إضافة قطعة غيار جديدة'}</h2>
                        <form onSubmit={handlePartSubmit} className="form">
                            <div className="form-row">
                                <div className="form-group">
                                    <label>الاسم</label>
                                    <input
                                        type="text"
                                        value={partForm.name}
                                        onChange={(e) => setPartForm({ ...partForm, name: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>السعر</label>
                                    <input
                                        type="number"
                                        value={partForm.price}
                                        onChange={(e) => setPartForm({ ...partForm, price: e.target.value })}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group">
                                    <label>الماركة</label>
                                    <input
                                        type="text"
                                        value={partForm.brand}
                                        onChange={(e) => setPartForm({ ...partForm, brand: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>الموديل</label>
                                    <input
                                        type="text"
                                        value={partForm.model}
                                        onChange={(e) => setPartForm({ ...partForm, model: e.target.value })}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="form-group">
                                <label>الوصف</label>
                                <textarea
                                    value={partForm.description}
                                    onChange={(e) => setPartForm({ ...partForm, description: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="form-row">
                                <div className="form-group">
                                    <label>رابط الصورة</label>
                                    <input
                                        type="url"
                                        value={partForm.imageUrl}
                                        onChange={(e) => setPartForm({ ...partForm, imageUrl: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>الحالة</label>
                                    <select
                                        value={partForm.status}
                                        onChange={(e) => setPartForm({ ...partForm, status: e.target.value })}
                                    >
                                        <option value="new">جديد</option>
                                        <option value="used">مستعمل</option>
                                    </select>
                                </div>
                            </div>
                            <div className="form-actions">
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

                        <div className="data-list">
                            <h3>قطع الغيار الموجودة</h3>
                            <div className="list">
                                {parts.map((part) => (
                                    <div key={part._id} className="list-item">
                                        <div className="item-image">
                                            {part.imageUrl ? (
                                                <img
                                                    src={part.imageUrl}
                                                    alt={part.name}
                                                    onError={(e) => {
                                                        e.target.style.display = 'none';
                                                        e.target.nextSibling.style.display = 'flex';
                                                    }}
                                                />
                                            ) : null}
                                            <div className="image-placeholder">
                                                <span>لا توجد صورة</span>
                                            </div>
                                        </div>
                                        <div className="item-info">
                                            <h4>{part.name}</h4>
                                            <p>{part.brand} - {part.model}</p>
                                            <p>السعر: {part.price} جنيه</p>
                                            <p>الحالة: {part.status === 'new' ? 'جديد' : 'مستعمل'}</p>
                                        </div>
                                        <div className="item-actions">
                                            <button onClick={() => handlePartEdit(part)}>تعديل</button>
                                            <button onClick={() => handlePartDelete(part._id)} className="delete">حذف</button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'videos' && (
                    <div className="tab-content">
                        <h2>{editingVideo ? 'تعديل فيديو' : 'إضافة فيديو جديد'}</h2>
                        <form onSubmit={handleVideoSubmit} className="form">
                            <div className="form-group">
                                <label>رابط الفيديو</label>
                                <input
                                    type="url"
                                    value={videoForm.url}
                                    onChange={(e) => setVideoForm({ ...videoForm, url: e.target.value })}
                                    placeholder="https://www.youtube.com/watch?v=..."
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>الوصف</label>
                                <textarea
                                    value={videoForm.description}
                                    onChange={(e) => setVideoForm({ ...videoForm, description: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="form-actions">
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

                        <div className="data-list">
                            <h3>الفيديوهات الموجودة</h3>
                            <div className="list">
                                {videos.map((video) => (
                                    <div key={video._id} className="list-item">
                                        <div className="item-info">
                                            <h4>{video.description}</h4>
                                            <p>{video.url}</p>
                                        </div>
                                        <div className="item-actions">
                                            <button onClick={() => handleVideoEdit(video)}>تعديل</button>
                                            <button onClick={() => handleVideoDelete(video._id)} className="delete">حذف</button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'articles' && (
                    <div className="tab-content">
                        <h2>{editingArticle ? 'تعديل مقال' : 'إضافة مقال جديد'}</h2>
                        <form onSubmit={handleArticleSubmit} className="form">
                            <div className="form-row">
                                <div className="form-group">
                                    <label>عنوان المقال</label>
                                    <input
                                        type="text"
                                        value={articleForm.title}
                                        onChange={(e) => setArticleForm({ ...articleForm, title: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>المؤلف</label>
                                    <input
                                        type="text"
                                        value={articleForm.author}
                                        onChange={(e) => setArticleForm({ ...articleForm, author: e.target.value })}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="form-group">
                                <label>وصف المقال</label>
                                <textarea
                                    value={articleForm.description}
                                    onChange={(e) => setArticleForm({ ...articleForm, description: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="form-row">
                                <div className="form-group">
                                    <label>رابط الصورة (اختياري)</label>
                                    <input
                                        type="url"
                                        value={articleForm.imageUrl}
                                        onChange={(e) => setArticleForm({ ...articleForm, imageUrl: e.target.value })}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>العلامات (مفصولة بفواصل)</label>
                                    <input
                                        type="text"
                                        value={articleForm.tags}
                                        onChange={(e) => setArticleForm({ ...articleForm, tags: e.target.value })}
                                        placeholder="تقنية, صيانة, نصائح"
                                    />
                                </div>
                            </div>
                            <div className="form-group">
                                <label>
                                    <input
                                        type="checkbox"
                                        checked={articleForm.published}
                                        onChange={(e) => setArticleForm({ ...articleForm, published: e.target.checked })}
                                    />
                                    {' '}نشر المقال
                                </label>
                            </div>

                            {/* Sections Management */}
                            <div className="sections-management">
                                <h3>أقسام المقال</h3>
                                <div className="section-form">
                                    <div className="form-row">
                                        <div className="form-group">
                                            <label>عنوان القسم</label>
                                            <input
                                                type="text"
                                                value={sectionForm.heading}
                                                onChange={(e) => setSectionForm({ ...sectionForm, heading: e.target.value })}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>محتوى القسم</label>
                                            <textarea
                                                value={sectionForm.paragraph}
                                                onChange={(e) => setSectionForm({ ...sectionForm, paragraph: e.target.value })}
                                            />
                                        </div>
                                    </div>
                                    <button type="button" onClick={addSection} className="add-section-btn">
                                        إضافة قسم
                                    </button>
                                </div>

                                {/* Display existing sections */}
                                {articleForm.sections.length > 0 && (
                                    <div className="sections-list">
                                        <h4>الأقسام المضافة:</h4>
                                        {articleForm.sections.map((section, index) => (
                                            <div key={index} className="section-item">
                                                <h5>{section.heading}</h5>
                                                <p>{section.paragraph}</p>
                                                <button type="button" onClick={() => removeSection(index)} className="remove-section-btn">
                                                    حذف القسم
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            <div className="form-actions">
                                <button type="submit" disabled={loading}>
                                    {loading ? 'جاري الحفظ...' : (editingArticle ? 'تحديث' : 'إضافة')}
                                </button>
                                {editingArticle && (
                                    <button type="button" onClick={cancelEdit}>
                                        إلغاء
                                    </button>
                                )}
                            </div>
                        </form>

                        <div className="data-list">
                            <h3>المقالات الموجودة</h3>
                            <div className="list">
                                {articles.map((article) => (
                                    <div key={article._id} className="list-item">
                                        <div className="item-image">
                                            {article.imageUrl ? (
                                                <img
                                                    src={article.imageUrl}
                                                    alt={article.title}
                                                    onError={(e) => {
                                                        e.target.style.display = 'none';
                                                        e.target.nextSibling.style.display = 'flex';
                                                    }}
                                                />
                                            ) : null}
                                            <div className="image-placeholder">
                                                <span>لا توجد صورة</span>
                                            </div>
                                        </div>
                                        <div className="item-info">
                                            <h4>{article.title}</h4>
                                            <p>المؤلف: {article.author}</p>
                                            <p>الحالة: {article.published ? 'منشور' : 'مسودة'}</p>
                                            <p>عدد الأقسام: {article.sections ? article.sections.length : 0}</p>
                                            {article.tags && article.tags.length > 0 && (
                                                <p>العلامات: {article.tags.join(', ')}</p>
                                            )}
                                        </div>
                                        <div className="item-actions">
                                            <button onClick={() => handleArticleEdit(article)}>تعديل</button>
                                            <button onClick={() => handleArticleDelete(article._id)} className="delete">حذف</button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminDashboard; 
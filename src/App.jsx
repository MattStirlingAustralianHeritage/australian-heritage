import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import ArticlePage from './pages/ArticlePage'
import CategoryPage from './pages/CategoryPage'
import DocumentariesPage from './pages/DocumentariesPage'
import AboutPage from './pages/AboutPage'
import AdminApp from './pages/AdminApp'

export default function App() {
  return (
    <Routes>
      {/* Admin routes - no header/footer */}
      <Route path="/admin/*" element={<AdminApp />} />

      {/* Public routes */}
      <Route path="*" element={
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
          <Header />
          <main style={{ flex: 1 }}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/article/:slug" element={<ArticlePage />} />
              <Route path="/category/:slug" element={<CategoryPage />} />
              <Route path="/documentaries" element={<DocumentariesPage />} />
              <Route path="/about" element={<AboutPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      } />
    </Routes>
  )
}

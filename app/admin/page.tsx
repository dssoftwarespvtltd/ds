'use client'

import { useEffect, useState, useCallback, useMemo, useRef } from 'react'
import { createClient } from '@supabase/supabase-js'
import {
  LayoutDashboard,
  FolderKanban,
  Users,
  MessageSquare,
  FileText,
  Settings,
  Image as ImageIcon,
  Star,
  HelpCircle,
  LogOut,
  Plus,
  Edit,
  Trash2,
  Search,
  Eye,
  EyeOff,
  Menu,
  X,
  TrendingUp,
  TrendingDown,
  Mail,
  Phone,
  Calendar,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Save,
  Upload,
  Globe,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Bell,
  User,
  Wrench,
  Quote,
  Newspaper,
  Inbox,
  Users2,
  Camera,
  Command,
  Video,
  Download,
  ExternalLink,
  Sparkles,
  ArrowUpRight,
  Grid,
  List,
  Check,
  BarChart3,
  Layout
} from 'lucide-react'

// Custom Social Media Icons
const LinkedInIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
)

const TwitterIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
)

const GitHubIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
)

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

const supabase = createClient(supabaseUrl || '', supabaseAnonKey || '')

// Types
interface Project {
  id: string
  slug: string
  client_name: string
  title: string
  category: string
  hero_headline: string
  short_description: string | null
  full_description: string | null
  visit_url: string | null
  challenge: string | null
  solution: string | null
  results: string | null
  tech_stack: any
  is_published: boolean
  is_featured: boolean
  created_at: string
  updated_at: string
}

interface MediaAsset {
  id?: string
  project_id?: string
  bucket_name: string
  file_path: string
  alt_text?: string
  mime_type?: string
  file_size?: number
  width?: number
  height?: number
  sort_order?: number
  created_at?: string
  publicUrl?: string
  name?: string
  metadata?: any
}

// Navigation items
const navigationSections = [
  {
    title: 'Overview',
    items: [
      { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    ]
  },
  {
    title: 'Content',
    items: [
      { id: 'projects', label: 'Projects', icon: FolderKanban },
      { id: 'blog', label: 'Blog Posts', icon: Newspaper },
      { id: 'testimonials', label: 'Testimonials', icon: Quote },
      { id: 'faqs', label: 'FAQs', icon: HelpCircle },
      { id: 'media', label: 'Media Library', icon: Camera },
    ]
  },
  {
    title: 'Management',
    items: [
      { id: 'services', label: 'Services', icon: Wrench },
      { id: 'team', label: 'Team Members', icon: Users2 },
      { id: 'contacts', label: 'Inbox', icon: Inbox },
    ]
  },
]

const categories = ['FINTECH', 'E-COMMERCE', 'ARTIFICIAL INTELLIGENCE', 'SAAS', 'HEALTHCARE', 'EDUCATION', 'REAL_ESTATE', 'LOGISTICS', 'BEAUTY', 'AUTOMOTIVE', 'NON_PROFIT']
const blogCategories = ['TECHNOLOGY', 'DESIGN', 'DEVELOPMENT', 'BUSINESS', 'INDUSTRY INSIGHTS', 'TUTORIALS', 'CASE STUDIES', 'COMPANY NEWS']
const contactStatuses = ['new', 'contacted', 'qualified', 'proposal_sent', 'won', 'closed', 'spam']
const faqCategories = ['GENERAL', 'SERVICES', 'PRICING', 'PROCESS', 'TECHNICAL', 'SUPPORT', 'PARTNERSHIP']
const sectionTypes = ['OVERVIEW', 'CHALLENGE', 'SOLUTION', 'RESULTS', 'TECH_STACK', 'PROCESS', 'QUOTE', 'CUSTOM']
const bucketNames = ['project-images', 'project-media', 'brand-assets', 'team-photos', 'project-documents', 'project-videos']

export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [notificationsOpen, setNotificationsOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  // Data states
  const [projects, setProjects] = useState<Project[]>([])
  const [services, setServices] = useState<any[]>([])
  const [testimonials, setTestimonials] = useState<any[]>([])
  const [blogPosts, setBlogPosts] = useState<any[]>([])
  const [contacts, setContacts] = useState<any[]>([])
  const [teamMembers, setTeamMembers] = useState<any[]>([])
  const [faqs, setFAQs] = useState<any[]>([])
  const [mediaAssets, setMediaAssets] = useState<MediaAsset[]>([])

  // UI states
  const [showModal, setShowModal] = useState(false)
  const [editingItem, setEditingItem] = useState<any>(null)
  const [modalType, setModalType] = useState<string>('')
  const [activeBucket, setActiveBucket] = useState('project-images')
  const [mediaView, setMediaView] = useState<'grid' | 'list'>('grid')
  const [uploadingFiles, setUploadingFiles] = useState<File[]>([])
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const fetchAllData = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const [projectsRes, servicesRes, testimonialsRes, blogRes, contactsRes, teamRes, faqsRes] = await Promise.all([
        supabase.from('projects').select('*').order('created_at', { ascending: false }),
        supabase.from('services').select('*').order('sort_order'),
        supabase.from('testimonials').select('*').order('created_at', { ascending: false }),
        supabase.from('blog_posts').select('*').order('created_at', { ascending: false }),
        supabase.from('contact_submissions').select('*').order('created_at', { ascending: false }),
        supabase.from('team_members').select('*').order('sort_order'),
        supabase.from('faqs').select('*').order('sort_order'),
      ])

      setProjects(projectsRes.data || [])
      setServices(servicesRes.data || [])
      setTestimonials(testimonialsRes.data || [])
      setBlogPosts(blogRes.data || [])
      setContacts(contactsRes.data || [])
      setTeamMembers(teamRes.data || [])
      setFAQs(faqsRes.data || [])
    } catch (err: any) {
      console.error('Error fetching data:', err)
      setError(err.message || 'Failed to fetch data')
    } finally {
      setLoading(false)
    }
  }, [])

  const fetchMediaAssets = useCallback(async () => {
    try {
      const { data, error } = await supabase.storage
        .from(activeBucket)
        .list()

      if (error) throw error

      const assetsWithUrls = await Promise.all(
        (data || []).map(async (file: any) => {
          const { data: { publicUrl } } = supabase.storage
            .from(activeBucket)
            .getPublicUrl(file.name)

          return {
            ...file,
            publicUrl,
            bucket: activeBucket,
            name: file.name
          }
        })
      )

      setMediaAssets(assetsWithUrls)
    } catch (err: any) {
      console.error('Error fetching media:', err)
    }
  }, [activeBucket])

  useEffect(() => {
    fetchAllData()
  }, [fetchAllData])

  useEffect(() => {
    if (activeTab === 'media') {
      fetchMediaAssets()
    }
  }, [activeTab, activeBucket, fetchMediaAssets])

  const showNotification = (type: 'success' | 'error', message: string) => {
    if (type === 'success') {
      setSuccess(message)
      setTimeout(() => setSuccess(null), 3000)
    } else {
      setError(message)
      setTimeout(() => setError(null), 5000)
    }
  }

  const handleCreate = (type: string) => {
    setModalType(type)
    setEditingItem(null)
    setShowModal(true)
  }

  const handleEdit = (type: string, item: any) => {
    setModalType(type)
    setEditingItem(item)
    setShowModal(true)
  }

  const handleDelete = async (type: string, id: string) => {
    if (!window.confirm('Are you sure you want to delete this item?')) return

    setLoading(true)
    setError(null)

    try {
      const { error: deleteError } = await supabase.from(type).delete().eq('id', id)
      if (deleteError) throw new Error(deleteError.message)

      await fetchAllData()
      showNotification('success', 'Item deleted successfully')
    } catch (err: any) {
      showNotification('error', err.message || 'Failed to delete item')
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async (data: any, relatedData?: any) => {
    setLoading(true)
    setError(null)

    try {
      let result
      let projectId = editingItem?.id

      if (editingItem) {
        result = await supabase.from(modalType).update(data).eq('id', editingItem.id).select()
        if (result.error) throw result.error
        showNotification('success', 'Item updated successfully')
      } else {
        result = await supabase.from(modalType).insert([data]).select()
        if (result.error) throw result.error
        projectId = result.data?.[0]?.id
        showNotification('success', 'Item created successfully')
      }

      if (modalType === 'projects' && relatedData && projectId) {
        if (editingItem) {
          await Promise.all([
            supabase.from('testimonials').delete().eq('project_id', projectId),
            supabase.from('metrics').delete().eq('project_id', projectId),
            supabase.from('page_sections').delete().eq('project_id', projectId),
            supabase.from('media_assets').delete().eq('project_id', projectId),
          ])
        }

        if (relatedData.testimonials?.length > 0) {
          const validTestimonials = relatedData.testimonials
            .filter((t: any) => t.quote_text.trim() && t.author_name.trim())
            .map((t: any) => ({
              project_id: projectId,
              quote_text: t.quote_text,
              author_name: t.author_name,
              author_title: t.author_title,
              author_company: t.author_company,
              author_image_url: t.author_image_url,
              rating: t.rating || 5,
              is_featured: t.is_featured || false,
            }))

          if (validTestimonials.length > 0) {
            await supabase.from('testimonials').insert(validTestimonials)
          }
        }

        if (relatedData.metrics?.length > 0) {
          const validMetrics = relatedData.metrics.filter((m: any) => m.label && m.value)
          if (validMetrics.length > 0) {
            await supabase.from('metrics').insert([{
              project_id: projectId,
              metrics_data: { metrics: validMetrics },
              display_type: 'grid'
            }])
          }
        }

        if (relatedData.sections?.length > 0) {
          const validSections = relatedData.sections
            .filter((s: any) => s.title || s.body)
            .map((s: any) => ({
              project_id: projectId,
              section_type: s.section_type,
              title: s.title,
              body: s.body,
              sort_order: s.sort_order || 0,
              is_active: true
            }))

          if (validSections.length > 0) {
            await supabase.from('page_sections').insert(validSections)
          }
        }

        if (relatedData.mediaAssets?.length > 0) {
          const validMedia = relatedData.mediaAssets.map((m: any) => ({
            project_id: projectId,
            bucket_name: m.bucket_name,
            file_path: m.file_path,
            alt_text: m.alt_text,
            mime_type: m.mime_type,
            file_size: m.file_size,
            sort_order: m.sort_order || 0
          }))

          if (validMedia.length > 0) {
            await supabase.from('media_assets').insert(validMedia)
          }
        }
      }

      setShowModal(false)
      await fetchAllData()
    } catch (err: any) {
      showNotification('error', err.message || 'Failed to save item')
    } finally {
      setLoading(false)
    }
  }

  const togglePublish = async (type: string, id: string, currentState: boolean) => {
    try {
      const field = type === 'projects' ? 'is_published' : 'is_active'
      const { error } = await supabase.from(type).update({ [field]: !currentState }).eq('id', id)
      if (error) throw error
      await fetchAllData()
      showNotification('success', 'Status updated')
    } catch (err: any) {
      showNotification('error', err.message || 'Failed to update status')
    }
  }

  const updateContactStatus = async (id: string, newStatus: string) => {
    try {
      const { error } = await supabase.from('contact_submissions').update({ status: newStatus }).eq('id', id)
      if (error) throw error
      setContacts(contacts.map(c => c.id === id ? { ...c, status: newStatus } : c))
      showNotification('success', 'Contact status updated')
    } catch (err: any) {
      showNotification('error', err.message || 'Failed to update status')
    }
  }

  const handleFileUpload = async (files: FileList | null) => {
    if (!files || files.length === 0) return

    const fileArray = Array.from(files)
    setUploadingFiles(fileArray)

    try {
      for (const file of fileArray) {
        const filePath = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`

        const { error: uploadError } = await supabase.storage
          .from(activeBucket)
          .upload(filePath, file, {
            cacheControl: '3600',
            upsert: false
          })

        if (uploadError) throw uploadError
      }

      showNotification('success', `${fileArray.length} file(s) uploaded successfully`)
      await fetchMediaAssets()
    } catch (err: any) {
      showNotification('error', err.message || 'Failed to upload files')
    } finally {
      setUploadingFiles([])
    }
  }

  const handleDeleteMedia = async (fileName: string) => {
    if (!window.confirm(`Delete ${fileName}?`)) return

    try {
      const { error } = await supabase.storage
        .from(activeBucket)
        .remove([fileName])

      if (error) throw error

      showNotification('success', 'File deleted successfully')
      await fetchMediaAssets()
    } catch (err: any) {
      showNotification('error', err.message || 'Failed to delete file')
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    handleFileUpload(e.dataTransfer.files)
  }

  const newContactsCount = contacts.filter(c => c.status === 'new').length

  const filteredProjects = useMemo(() => {
    if (!searchQuery) return projects
    return projects.filter(p => 
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.client_name.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }, [projects, searchQuery])

  return (
    <div className="admin-root" style={{ minHeight: '100vh', background: '#0a0a0f', color: '#ffffff' }}>
      <style jsx global>{`
        .admin-root {
          all: initial;
          display: block;
          min-height: 100vh;
          background: #0a0a0f;
          color: #ffffff;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
        }
        .admin-root * {
          box-sizing: border-box;
        }
        .admin-root body {
          margin: 0;
          padding: 0;
          background: #0a0a0f;
        }
        .admin-root a {
          color: inherit;
          text-decoration: none;
        }
        .admin-root button {
          font-family: inherit;
          cursor: pointer;
        }
        .admin-root input,
        .admin-root textarea,
        .admin-root select {
          font-family: inherit;
        }
        @keyframes fadeIn { 
          from { opacity: 0; transform: translateY(10px); } 
          to { opacity: 1; transform: translateY(0); } 
        }
        .fade-in { animation: fadeIn 0.3s ease-out; }
        @keyframes slideIn { 
          from { transform: translateX(-100%); } 
          to { transform: translateX(0); } 
        }
        .slide-in { animation: slideIn 0.3s ease-out; }
        @keyframes scaleIn { 
          from { opacity: 0; transform: scale(0.95); } 
          to { opacity: 1; transform: scale(1); } 
        }
        .scale-in { animation: scaleIn 0.2s ease-out; }
        .glass-effect { 
          background: rgba(19, 19, 24, 0.8); 
          backdrop-filter: blur(10px); 
        }
        .hover-glow:hover { 
          box-shadow: 0 0 20px rgba(119, 39, 255, 0.3); 
        }
        .gradient-text {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .scrollbar-thin::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }
        .scrollbar-thin::-webkit-scrollbar-track {
          background: #1a1a24;
          border-radius: 4px;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb {
          background: #2a2a35;
          border-radius: 4px;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb:hover {
          background: #3a3a45;
        }
      `}</style>

      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-72 bg-[#131318] border-r border-[#2a2a35] transform transition-transform duration-300 ease-in-out ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:translate-x-0`}>
        {/* Logo */}
        <div className="flex items-center justify-between h-16 px-6 border-b border-[#2a2a35] bg-gradient-to-r from-[#1a1a24] to-[#131318]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#7727ff] to-[#6417ed] flex items-center justify-center shadow-lg shadow-purple-500/20">
              <Command size={20} className="text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold">
                <span className="text-[#a77aff]">DS</span> <span className="gradient-text">Admin</span>
              </h1>
              <p className="text-xs text-[#a0a0b0]">Portfolio Dashboard</p>
            </div>
          </div>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden p-2 rounded-lg hover:bg-[#1a1a24]">
            <X size={20} />
          </button>
        </div>

        {/* User Profile Summary */}
        <div className="p-4 border-b border-[#2a2a35] bg-[#1a1a24]/50">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#7727ff] to-[#6417ed] flex items-center justify-center">
                <User size={18} className="text-white" />
              </div>
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-[#131318]" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium">Admin User</p>
              <p className="text-xs text-[#a0a0b0]">admin@example.com</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-4 overflow-y-auto h-[calc(100vh-180px)] scrollbar-thin">
          {navigationSections.map((section) => (
            <div key={section.title}>
              <p className="px-4 mb-2 text-xs font-semibold text-[#a0a0b0] uppercase tracking-wider">
                {section.title}
              </p>
              <div className="space-y-1">
                {section.items.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveTab(item.id)
                      setSidebarOpen(false)
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all group relative ${
                      activeTab === item.id
                        ? 'bg-gradient-to-r from-[#7727ff] to-[#6417ed] text-white shadow-lg shadow-purple-500/20'
                        : 'text-[#a0a0b0] hover:bg-[#1a1a24] hover:text-white'
                    }`}
                  >
                    <item.icon size={18} className={activeTab === item.id ? 'text-white' : 'text-[#a0a0b0] group-hover:text-white'} />
                    <span>{item.label}</span>
                    {item.id === 'contacts' && newContactsCount > 0 && (
                      <span className="ml-auto px-2 py-0.5 text-xs bg-red-500 text-white rounded-full">
                        {newContactsCount}
                      </span>
                    )}
                    {activeTab === item.id && (
                      <span className="absolute right-2 top-1/2 transform -translate-y-1/2 w-1 h-4 bg-white rounded-full" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </nav>

        {/* Sidebar Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-[#2a2a35] bg-[#1a1a24]/50">
          <button className="w-full flex items-center gap-2 px-4 py-2 rounded-lg text-sm text-[#a0a0b0] hover:bg-[#2a2a35] hover:text-white transition-colors">
            <Settings size={16} />
            Settings
          </button>
          <button className="w-full flex items-center gap-2 px-4 py-2 rounded-lg text-sm text-red-400 hover:bg-red-500/10 transition-colors">
            <LogOut size={16} />
            Logout
          </button>
        </div>
      </aside>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Main content */}
      <div className="lg:pl-72">
        {/* Header */}
        <header className="sticky top-0 z-30 glass-effect border-b border-[#2a2a35]">
          <div className="flex items-center justify-between h-16 px-4 sm:px-6">
            <div className="flex items-center gap-3">
              <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2 rounded-lg hover:bg-[#1a1a24]">
                <Menu size={20} />
              </button>
              <div>
                <h2 className="text-lg font-semibold capitalize">{activeTab}</h2>
                <p className="text-xs text-[#a0a0b0] hidden sm:block">Welcome back, Admin</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {/* Global Search */}
              <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-[#131318] border border-[#2a2a35] rounded-xl focus-within:border-[#7727ff] transition-colors">
                <Search size={16} className="text-[#a0a0b0]" />
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-transparent focus:outline-none text-sm w-48"
                />
              </div>

              {/* Notifications */}
              <div className="relative">
                <button
                  onClick={() => setNotificationsOpen(!notificationsOpen)}
                  className="p-2 rounded-lg hover:bg-[#1a1a24] transition-colors relative"
                >
                  <Bell size={18} />
                  {newContactsCount > 0 && (
                    <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                  )}
                </button>
                {notificationsOpen && (
                  <div className="absolute right-0 mt-2 w-80 bg-[#131318] border border-[#2a2a35] rounded-xl shadow-2xl scale-in z-50">
                    <div className="p-4 border-b border-[#2a2a35]">
                      <h3 className="font-semibold">Notifications</h3>
                    </div>
                    <div className="max-h-96 overflow-y-auto scrollbar-thin">
                      {newContactsCount > 0 ? (
                        <div className="p-4 hover:bg-[#1a1a24] cursor-pointer" onClick={() => { setActiveTab('contacts'); setNotificationsOpen(false); }}>
                          <div className="flex items-start gap-3">
                            <div className="p-2 bg-blue-500/20 rounded-lg">
                              <Inbox size={16} className="text-blue-400" />
                            </div>
                            <div>
                              <p className="text-sm font-medium">New Contact Submissions</p>
                              <p className="text-xs text-[#a0a0b0] mt-1">You have {newContactsCount} new messages</p>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="p-8 text-center text-[#a0a0b0]">
                          <Bell size={32} className="mx-auto mb-3 opacity-50" />
                          <p className="text-sm">No new notifications</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* User Menu */}
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 p-2 rounded-lg hover:bg-[#1a1a24] transition-colors"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#7727ff] to-[#6417ed] flex items-center justify-center">
                    <User size={16} className="text-white" />
                  </div>
                  <ChevronDown size={14} className="hidden sm:block text-[#a0a0b0]" />
                </button>
                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-[#131318] border border-[#2a2a35] rounded-xl shadow-2xl scale-in z-50">
                    <div className="p-2">
                      <div className="px-3 py-2 border-b border-[#2a2a35] mb-2">
                        <p className="text-sm font-medium">Admin User</p>
                        <p className="text-xs text-[#a0a0b0]">admin@example.com</p>
                      </div>
                      <button className="w-full flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-[#1a1a24] text-sm">
                        <User size={14} /> Profile
                      </button>
                      <button className="w-full flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-[#1a1a24] text-sm">
                        <Settings size={14} /> Settings
                      </button>
                      <div className="border-t border-[#2a2a35] my-2" />
                      <button className="w-full flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-red-500/10 text-red-400 text-sm">
                        <LogOut size={14} /> Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Notifications */}
        {error && (
          <div className="fixed top-20 right-4 z-50 flex items-center gap-2 px-4 py-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm shadow-lg scale-in max-w-md">
            <AlertCircle size={16} className="flex-shrink-0" />
            <span>{error}</span>
            <button onClick={() => setError(null)} className="ml-auto"><X size={14} /></button>
          </div>
        )}
        {success && (
          <div className="fixed top-20 right-4 z-50 flex items-center gap-2 px-4 py-3 bg-green-500/10 border border-green-500/20 rounded-xl text-green-400 text-sm shadow-lg scale-in max-w-md">
            <CheckCircle2 size={16} className="flex-shrink-0" />
            <span>{success}</span>
            <button onClick={() => setSuccess(null)} className="ml-auto"><X size={14} /></button>
          </div>
        )}

        {/* Loading overlay */}
        {loading && (
          <div className="fixed inset-0 bg-black/30 z-40 flex items-center justify-center">
            <div className="glass-effect p-6 rounded-2xl border border-[#2a2a35] flex items-center gap-3">
              <Loader2 className="animate-spin text-[#7727ff]" size={24} />
              <span>Loading...</span>
            </div>
          </div>
        )}

        {/* Content area */}
        <main className="p-4 sm:p-6 lg:p-8">
          {activeTab === 'dashboard' && (
            <Dashboard
              projects={projects}
              contacts={contacts}
              blogPosts={blogPosts}
              testimonials={testimonials}
              onNavigate={setActiveTab}
            />
          )}

          {activeTab === 'projects' && (
            <ProjectsTab
              projects={filteredProjects}
              onEdit={(item) => handleEdit('projects', item)}
              onDelete={(id) => handleDelete('projects', id)}
              onCreate={() => handleCreate('projects')}
              onTogglePublish={(id, state) => togglePublish('projects', id, state)}
            />
          )}

          {activeTab === 'services' && (
            <ServicesTab
              services={services}
              onEdit={(item) => handleEdit('services', item)}
              onDelete={(id) => handleDelete('services', id)}
              onCreate={() => handleCreate('services')}
            />
          )}

          {activeTab === 'testimonials' && (
            <TestimonialsTab
              testimonials={testimonials}
              projects={projects}
              onEdit={(item) => handleEdit('testimonials', item)}
              onDelete={(id) => handleDelete('testimonials', id)}
              onCreate={() => handleCreate('testimonials')}
            />
          )}

          {activeTab === 'blog' && (
            <BlogTab
              posts={blogPosts}
              onEdit={(item) => handleEdit('blog_posts', item)}
              onDelete={(id) => handleDelete('blog_posts', id)}
              onCreate={() => handleCreate('blog_posts')}
            />
          )}

          {activeTab === 'contacts' && (
            <ContactsTab
              contacts={contacts}
              onEdit={(item) => handleEdit('contact_submissions', item)}
              onDelete={(id) => handleDelete('contact_submissions', id)}
              onStatusChange={updateContactStatus}
            />
          )}

          {activeTab === 'team' && (
            <TeamTab
              members={teamMembers}
              onEdit={(item) => handleEdit('team_members', item)}
              onDelete={(id) => handleDelete('team_members', id)}
              onCreate={() => handleCreate('team_members')}
            />
          )}

          {activeTab === 'faqs' && (
            <FAQsTab
              faqs={faqs}
              onEdit={(item) => handleEdit('faqs', item)}
              onDelete={(id) => handleDelete('faqs', id)}
              onCreate={() => handleCreate('faqs')}
            />
          )}

          {activeTab === 'media' && (
            <MediaLibrary
              mediaAssets={mediaAssets}
              activeBucket={activeBucket}
              setActiveBucket={setActiveBucket}
              mediaView={mediaView}
              setMediaView={setMediaView}
              onUpload={handleFileUpload}
              onDelete={handleDeleteMedia}
              isDragging={isDragging}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              uploadingFiles={uploadingFiles}
              fileInputRef={fileInputRef}
            />
          )}
        </main>
      </div>

      {/* Modal */}
      {showModal && (
        <Modal
          type={modalType}
          item={editingItem}
          onClose={() => setShowModal(false)}
          onSave={handleSave}
          projects={projects}
          teamMembers={teamMembers}
        />
      )}
    </div>
  )
}

// Dashboard Component
function Dashboard({ projects, contacts, blogPosts, testimonials, onNavigate }: any) {
  const publishedProjects = projects.filter((p: any) => p.is_published).length
  const draftProjects = projects.length - publishedProjects
  const newContacts = contacts.filter((c: any) => c.status === 'new').length
  const publishedPosts = blogPosts.filter((p: any) => p.status === 'published').length
  
  const stats = [
    { 
      label: 'Total Projects', 
      value: projects.length, 
      icon: FolderKanban, 
      color: '#7727ff', 
      bg: 'from-purple-500/20 to-purple-500/5',
      trend: '+12%',
      trendUp: true
    },
    { 
      label: 'New Contacts', 
      value: newContacts, 
      icon: Inbox, 
      color: '#4ade80', 
      bg: 'from-green-500/20 to-green-500/5',
      trend: '+5%',
      trendUp: true
    },
    { 
      label: 'Blog Posts', 
      value: blogPosts.length, 
      icon: Newspaper, 
      color: '#f472b6', 
      bg: 'from-pink-500/20 to-pink-500/5',
      trend: '+8%',
      trendUp: true
    },
    { 
      label: 'Testimonials', 
      value: testimonials.length, 
      icon: Star, 
      color: '#fbbf24', 
      bg: 'from-yellow-500/20 to-yellow-500/5',
      trend: '+3%',
      trendUp: true
    },
  ]

  return (
    <div className="space-y-6 fade-in">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#7727ff] to-[#6417ed] p-8">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, white 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
        <div className="relative flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-2">Welcome back! 👋</h2>
            <p className="text-white/80">Here's what's happening with your projects today.</p>
            <div className="flex gap-3 mt-4">
              <button 
                onClick={() => onNavigate('projects')}
                className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg text-sm font-medium transition-colors"
              >
                View Projects
              </button>
              <button 
                onClick={() => onNavigate('contacts')}
                className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm font-medium transition-colors"
              >
                Check Inbox
              </button>
            </div>
          </div>
          <div className="hidden md:block">
            <Sparkles size={48} className="text-white/50" />
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div key={stat.label} className="glass-effect rounded-2xl border border-[#2a2a35] p-6 hover-glow transition-all group">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.bg} group-hover:scale-110 transition-transform`}>
                <stat.icon size={20} style={{ color: stat.color }} />
              </div>
              <div className={`flex items-center gap-1 text-xs ${stat.trendUp ? 'text-green-400' : 'text-red-400'}`}>
                {stat.trendUp ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                {stat.trend}
              </div>
            </div>
            <h3 className="text-3xl font-bold">{stat.value}</h3>
            <p className="text-sm text-[#a0a0b0] mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <button 
          onClick={() => onNavigate('projects')} 
          className="glass-effect rounded-2xl border border-[#2a2a35] p-6 text-left hover-glow transition-all group"
        >
          <div className="flex items-center justify-between mb-3">
            <FolderKanban size={24} className="text-[#7727ff] group-hover:scale-110 transition-transform" />
            <ArrowUpRight size={16} className="text-[#a0a0b0] group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </div>
          <h3 className="font-semibold">Manage Projects</h3>
          <p className="text-sm text-[#a0a0b0] mt-1">Create and edit your portfolio projects</p>
          <div className="mt-3 flex gap-2">
            <span className="px-2 py-1 text-xs bg-purple-500/20 text-purple-400 rounded-full">{publishedProjects} Published</span>
            <span className="px-2 py-1 text-xs bg-gray-500/20 text-gray-400 rounded-full">{draftProjects} Drafts</span>
          </div>
        </button>
        
        <button 
          onClick={() => onNavigate('contacts')} 
          className="glass-effect rounded-2xl border border-[#2a2a35] p-6 text-left hover-glow transition-all group"
        >
          <div className="flex items-center justify-between mb-3">
            <Inbox size={24} className="text-[#4ade80] group-hover:scale-110 transition-transform" />
            <ArrowUpRight size={16} className="text-[#a0a0b0] group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </div>
          <h3 className="font-semibold">View Contacts</h3>
          <p className="text-sm text-[#a0a0b0] mt-1">Check new client inquiries</p>
          {newContacts > 0 && (
            <div className="mt-3">
              <span className="px-2 py-1 text-xs bg-green-500/20 text-green-400 rounded-full">{newContacts} New</span>
            </div>
          )}
        </button>
        
        <button 
          onClick={() => onNavigate('blog')} 
          className="glass-effect rounded-2xl border border-[#2a2a35] p-6 text-left hover-glow transition-all group"
        >
          <div className="flex items-center justify-between mb-3">
            <Newspaper size={24} className="text-[#f472b6] group-hover:scale-110 transition-transform" />
            <ArrowUpRight size={16} className="text-[#a0a0b0] group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </div>
          <h3 className="font-semibold">Write Blog</h3>
          <p className="text-sm text-[#a0a0b0] mt-1">Create engaging content</p>
          <div className="mt-3 flex gap-2">
            <span className="px-2 py-1 text-xs bg-pink-500/20 text-pink-400 rounded-full">{publishedPosts} Published</span>
          </div>
        </button>
      </div>

      {/* Recent Activity */}
      <div className="glass-effect rounded-2xl border border-[#2a2a35] p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold">Recent Projects</h3>
          <button onClick={() => onNavigate('projects')} className="text-sm text-[#a77aff] hover:text-white transition-colors">
            View All
          </button>
        </div>
        {projects.length > 0 ? (
          <div className="space-y-3">
            {projects.slice(0, 5).map((project: any) => (
              <div key={project.id} className="flex items-center gap-4 p-3 rounded-lg hover:bg-[#1a1a24] transition-colors">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#7727ff] to-[#6417ed] flex items-center justify-center">
                  <FolderKanban size={18} className="text-white" />
                </div>
                <div className="flex-1">
                  <p className="font-medium">{project.title}</p>
                  <p className="text-sm text-[#a0a0b0]">{project.client_name}</p>
                </div>
                <span className={`px-2 py-1 text-xs rounded-full ${
                  project.is_published ? 'bg-green-500/20 text-green-400' : 'bg-gray-500/20 text-gray-400'
                }`}>
                  {project.is_published ? 'Published' : 'Draft'}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-[#a0a0b0] text-center py-8">No projects yet</p>
        )}
      </div>
    </div>
  )
}

// ProjectsTab Component
function ProjectsTab({ projects, onEdit, onDelete, onCreate, onTogglePublish }: any) {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterCategory, setFilterCategory] = useState('ALL')
  const [filterStatus, setFilterStatus] = useState('ALL')
  const [sortBy, setSortBy] = useState('newest')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list')

  const filteredProjects = projects.filter((project: any) => {
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.client_name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = filterCategory === 'ALL' || project.category === filterCategory
    const matchesStatus = filterStatus === 'ALL' || 
      (filterStatus === 'published' && project.is_published) ||
      (filterStatus === 'draft' && !project.is_published) ||
      (filterStatus === 'featured' && project.is_featured)
    return matchesSearch && matchesCategory && matchesStatus
  })

  const sortedProjects = [...filteredProjects].sort((a: any, b: any) => {
    switch (sortBy) {
      case 'newest':
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      case 'oldest':
        return new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
      case 'name':
        return a.title.localeCompare(b.title)
      case 'client':
        return a.client_name.localeCompare(b.client_name)
      default:
        return 0
    }
  })

  return (
    <div className="space-y-4 fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Projects</h2>
          <p className="text-sm text-[#a0a0b0] mt-1">Manage your portfolio projects</p>
        </div>
        <button
          onClick={onCreate}
          className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#7727ff] to-[#6417ed] rounded-xl hover:shadow-lg hover:shadow-purple-500/30 transition-all group"
        >
          <Plus size={16} className="group-hover:rotate-90 transition-transform" />
          New Project
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex-1 flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#a0a0b0]" size={16} />
            <input
              type="text"
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-[#131318] border border-[#2a2a35] rounded-xl focus:outline-none focus:border-[#7727ff] transition-colors"
            />
          </div>
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="px-4 py-2.5 bg-[#131318] border border-[#2a2a35] rounded-xl focus:outline-none focus:border-[#7727ff]"
          >
            <option value="ALL">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2.5 bg-[#131318] border border-[#2a2a35] rounded-xl focus:outline-none focus:border-[#7727ff]"
          >
            <option value="ALL">All Status</option>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
            <option value="featured">Featured</option>
          </select>
        </div>
        <div className="flex gap-2">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2.5 bg-[#131318] border border-[#2a2a35] rounded-xl focus:outline-none focus:border-[#7727ff]"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="name">Sort by Name</option>
            <option value="client">Sort by Client</option>
          </select>
          <div className="flex bg-[#131318] border border-[#2a2a35] rounded-xl overflow-hidden">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2.5 ${viewMode === 'grid' ? 'bg-[#7727ff] text-white' : 'text-[#a0a0b0] hover:text-white'}`}
            >
              <Grid size={16} />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2.5 ${viewMode === 'list' ? 'bg-[#7727ff] text-white' : 'text-[#a0a0b0] hover:text-white'}`}
            >
              <List size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Projects Display */}
      {sortedProjects.length === 0 ? (
        <div className="glass-effect rounded-2xl border border-[#2a2a35] p-12 text-center">
          <FolderKanban size={48} className="mx-auto text-[#a0a0b0] mb-4" />
          <p className="text-[#a0a0b0]">No projects found</p>
        </div>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {sortedProjects.map((project: any) => (
            <div key={project.id} className="glass-effect rounded-2xl border border-[#2a2a35] overflow-hidden hover-glow transition-all group">
              <div className="h-32 bg-gradient-to-br from-[#7727ff]/20 to-[#6417ed]/20 flex items-center justify-center relative">
                <FolderKanban size={48} className="text-[#7727ff]" />
                <div className="absolute top-2 right-2 flex gap-1">
                  {project.is_featured && (
                    <span className="p-1 bg-yellow-500/20 rounded-lg">
                      <Star size={14} className="text-yellow-400" fill="currentColor" />
                    </span>
                  )}
                  <span className={`p-1 rounded-lg ${project.is_published ? 'bg-green-500/20' : 'bg-gray-500/20'}`}>
                    {project.is_published ? <Eye size={14} className="text-green-400" /> : <EyeOff size={14} className="text-gray-400" />}
                  </span>
                </div>
              </div>
              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="font-semibold">{project.title}</h3>
                    <p className="text-sm text-[#a0a0b0]">{project.client_name}</p>
                  </div>
                  <span className="px-2 py-1 text-xs bg-[#7727ff]/20 text-[#a77aff] rounded-full">
                    {project.category}
                  </span>
                </div>
                <div className="flex gap-2 mt-4">
                  <button
                    onClick={() => onEdit(project)}
                    className="flex-1 px-3 py-2 bg-[#2a2a35] hover:bg-[#3a3a45] rounded-lg text-sm transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(project.id)}
                    className="px-3 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg transition-colors"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="glass-effect rounded-2xl border border-[#2a2a35] overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#1a1a24]/50">
              <tr className="text-left text-sm text-[#a0a0b0]">
                <th className="px-6 py-3 font-medium">Project</th>
                <th className="px-6 py-3 font-medium">Client</th>
                <th className="px-6 py-3 font-medium">Category</th>
                <th className="px-6 py-3 font-medium">Status</th>
                <th className="px-6 py-3 font-medium">Created</th>
                <th className="px-6 py-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#2a2a35]">
              {sortedProjects.map((project: any) => (
                <tr key={project.id} className="hover:bg-[#1a1a24]/50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#7727ff] to-[#6417ed] flex items-center justify-center">
                        <FolderKanban size={14} className="text-white" />
                      </div>
                      <div>
                        <p className="font-medium">{project.title}</p>
                        <p className="text-sm text-[#a0a0b0]">{project.slug}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">{project.client_name}</td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 text-xs bg-[#7727ff]/20 text-[#a77aff] rounded-full">
                      {project.category}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => onTogglePublish(project.id, project.is_published)}
                      className={`flex items-center gap-1 px-3 py-1 text-xs rounded-full transition-colors ${
                        project.is_published
                          ? 'bg-green-500/20 text-green-400 hover:bg-green-500/30'
                          : 'bg-gray-500/20 text-gray-400 hover:bg-gray-500/30'
                      }`}
                    >
                      {project.is_published ? <Eye size={12} /> : <EyeOff size={12} />}
                      {project.is_published ? 'Published' : 'Draft'}
                    </button>
                  </td>
                  <td className="px-6 py-4 text-sm text-[#a0a0b0]">
                    {new Date(project.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => onEdit(project)}
                        className="p-2 rounded-lg bg-[#2a2a35] hover:bg-[#3a3a45] transition-colors"
                        title="Edit"
                      >
                        <Edit size={14} />
                      </button>
                      <button
                        onClick={() => onDelete(project.id)}
                        className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-colors"
                        title="Delete"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

// MediaLibrary Component
function MediaLibrary({ mediaAssets, activeBucket, setActiveBucket, mediaView, setMediaView, onUpload, onDelete, isDragging, onDragOver, onDragLeave, onDrop, uploadingFiles, fileInputRef }: any) {
  const [selectedAssets, setSelectedAssets] = useState<string[]>([])
  const [searchTerm, setSearchTerm] = useState('')

  const filteredAssets = mediaAssets.filter((asset: any) => 
    asset.name?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const toggleSelect = (name: string) => {
    setSelectedAssets(prev => 
      prev.includes(name) ? prev.filter(n => n !== name) : [...prev, name]
    )
  }

  const selectAll = () => {
    if (selectedAssets.length === filteredAssets.length) {
      setSelectedAssets([])
    } else {
      setSelectedAssets(filteredAssets.map((a: any) => a.name))
    }
  }

  const getFileIcon = (file: any) => {
    const ext = file.name?.split('.').pop()?.toLowerCase()
    if (['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'].includes(ext)) return ImageIcon
    if (['mp4', 'webm', 'mov'].includes(ext)) return Video
    return FileText
  }

  const formatFileSize = (bytes: number) => {
    if (!bytes) return 'N/A'
    const units = ['B', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(1024))
    return `${(bytes / Math.pow(1024, i)).toFixed(1)} ${units[i]}`
  }

  return (
    <div className="space-y-6 fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Media Library</h2>
          <p className="text-sm text-[#a0a0b0] mt-1">Manage your media assets</p>
        </div>
        <button
          onClick={() => fileInputRef.current?.click()}
          className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#7727ff] to-[#6417ed] rounded-xl hover:shadow-lg hover:shadow-purple-500/30 transition-all"
        >
          <Upload size={16} />
          Upload Files
        </button>
        <input
          ref={fileInputRef}
          type="file"
          multiple
          className="hidden"
          onChange={(e) => onUpload(e.target.files)}
        />
      </div>

      {/* Bucket Selector */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin">
        {bucketNames.map((bucket) => (
          <button
            key={bucket}
            onClick={() => setActiveBucket(bucket)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors whitespace-nowrap ${
              activeBucket === bucket
                ? 'bg-gradient-to-r from-[#7727ff] to-[#6417ed] text-white'
                : 'bg-[#131318] text-[#a0a0b0] hover:bg-[#1a1a24]'
            }`}
          >
            {bucket}
          </button>
        ))}
      </div>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#a0a0b0]" size={16} />
          <input
            type="text"
            placeholder="Search media..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-[#131318] border border-[#2a2a35] rounded-xl focus:outline-none focus:border-[#7727ff]"
          />
        </div>
        <div className="flex gap-2">
          <button
            onClick={selectAll}
            className="px-4 py-2 bg-[#131318] border border-[#2a2a35] rounded-xl text-sm hover:bg-[#1a1a24] transition-colors"
          >
            {selectedAssets.length === filteredAssets.length ? 'Deselect All' : 'Select All'}
          </button>
          {selectedAssets.length > 0 && (
            <button
              onClick={() => {
                selectedAssets.forEach(name => onDelete(name))
                setSelectedAssets([])
              }}
              className="px-4 py-2 bg-red-500/20 text-red-400 rounded-xl text-sm hover:bg-red-500/30 transition-colors"
            >
              Delete Selected ({selectedAssets.length})
            </button>
          )}
          <div className="flex bg-[#131318] border border-[#2a2a35] rounded-xl overflow-hidden">
            <button
              onClick={() => setMediaView('grid')}
              className={`p-2.5 ${mediaView === 'grid' ? 'bg-[#7727ff] text-white' : 'text-[#a0a0b0] hover:text-white'}`}
            >
              <Grid size={16} />
            </button>
            <button
              onClick={() => setMediaView('list')}
              className={`p-2.5 ${mediaView === 'list' ? 'bg-[#7727ff] text-white' : 'text-[#a0a0b0] hover:text-white'}`}
            >
              <List size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Upload Area */}
      <div
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        className={`border-2 border-dashed rounded-2xl p-8 text-center transition-colors ${
          isDragging ? 'border-[#7727ff] bg-[#7727ff]/10' : 'border-[#2a2a35] bg-[#131318]'
        }`}
      >
        <Upload size={32} className="mx-auto mb-3 text-[#a0a0b0]" />
        <p className="text-sm text-[#a0a0b0]">
          Drag and drop files here, or{' '}
          <button
            onClick={() => fileInputRef.current?.click()}
            className="text-[#a77aff] hover:text-white transition-colors"
          >
            browse
          </button>
        </p>
        {uploadingFiles.length > 0 && (
          <div className="mt-4 space-y-2">
            {uploadingFiles.map((file: File) => (
              <div key={file.name} className="flex items-center gap-3 text-sm">
                <Loader2 className="animate-spin text-[#7727ff]" size={16} />
                <span>{file.name}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Media Grid/List */}
      {filteredAssets.length === 0 ? (
        <div className="glass-effect rounded-2xl border border-[#2a2a35] p-12 text-center">
          <Camera size={48} className="mx-auto text-[#a0a0b0] mb-4" />
          <p className="text-[#a0a0b0]">No media files in this bucket</p>
        </div>
      ) : mediaView === 'grid' ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredAssets.map((asset: any) => {
            const FileIcon = getFileIcon(asset)
            return (
              <div
                key={asset.name}
                className={`glass-effect rounded-2xl border overflow-hidden transition-all cursor-pointer ${
                  selectedAssets.includes(asset.name)
                    ? 'border-[#7727ff] shadow-lg shadow-purple-500/20'
                    : 'border-[#2a2a35] hover:border-[#3a3a45]'
                }`}
                onClick={() => toggleSelect(asset.name)}
              >
                <div className="h-32 bg-[#1a1a24] flex items-center justify-center relative">
                  {asset.metadata?.mimetype?.startsWith('image/') ? (
                    <img src={asset.publicUrl} alt={asset.name} className="w-full h-full object-cover" />
                  ) : (
                    <FileIcon size={32} className="text-[#a0a0b0]" />
                  )}
                  {selectedAssets.includes(asset.name) && (
                    <div className="absolute top-2 right-2 p-1 bg-[#7727ff] rounded-lg">
                      <Check size={14} className="text-white" />
                    </div>
                  )}
                </div>
                <div className="p-3">
                  <p className="text-sm font-medium truncate">{asset.name}</p>
                  <p className="text-xs text-[#a0a0b0] mt-1">{formatFileSize(asset.metadata?.size)}</p>
                </div>
              </div>
            )
          })}
        </div>
      ) : (
        <div className="glass-effect rounded-2xl border border-[#2a2a35] overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#1a1a24]/50">
              <tr className="text-left text-sm text-[#a0a0b0]">
                <th className="px-6 py-3 font-medium">
                  <input
                    type="checkbox"
                    checked={selectedAssets.length === filteredAssets.length}
                    onChange={selectAll}
                    className="rounded"
                  />
                </th>
                <th className="px-6 py-3 font-medium">Name</th>
                <th className="px-6 py-3 font-medium">Type</th>
                <th className="px-6 py-3 font-medium">Size</th>
                <th className="px-6 py-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#2a2a35]">
              {filteredAssets.map((asset: any) => {
                const FileIcon = getFileIcon(asset)
                return (
                  <tr key={asset.name} className="hover:bg-[#1a1a24]/50 transition-colors">
                    <td className="px-6 py-4">
                      <input
                        type="checkbox"
                        checked={selectedAssets.includes(asset.name)}
                        onChange={() => toggleSelect(asset.name)}
                        className="rounded"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <FileIcon size={18} className="text-[#a0a0b0]" />
                        <span className="font-medium">{asset.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-[#a0a0b0]">
                      {asset.metadata?.mimetype || 'Unknown'}
                    </td>
                    <td className="px-6 py-4 text-sm text-[#a0a0b0]">
                      {formatFileSize(asset.metadata?.size)}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <a
                          href={asset.publicUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 rounded-lg bg-[#2a2a35] hover:bg-[#3a3a45] transition-colors"
                          title="Open"
                        >
                          <ExternalLink size={14} />
                        </a>
                        <button
                          onClick={() => onDelete(asset.name)}
                          className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-colors"
                          title="Delete"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

// Modal Component
function Modal({ type, item, onClose, onSave, projects, teamMembers }: any) {
  const [formData, setFormData] = useState<any>(item || {})
  const [activeStep, setActiveStep] = useState(1)
  const [techStack, setTechStack] = useState('')
  const [techStackList, setTechStackList] = useState<string[]>([])
  const [projectTestimonials, setProjectTestimonials] = useState<any[]>([])
  const [projectMetrics, setProjectMetrics] = useState<any[]>([])
  const [projectSections, setProjectSections] = useState<any[]>([])
  const [projectMedia, setProjectMedia] = useState<any[]>([])
  const [selectedBucket, setSelectedBucket] = useState('project-images')
  const [availableMedia, setAvailableMedia] = useState<any[]>([])

  useEffect(() => {
    if (item && type === 'projects') {
      setTechStackList(item.tech_stack || [])
      fetchRelatedData(item.id)
    }
    if (type === 'projects') {
      fetchBucketMedia(selectedBucket)
    }
  }, [item, type, selectedBucket])

  const fetchRelatedData = async (projectId: string) => {
    try {
      const [testimonialsRes, metricsRes, sectionsRes, mediaRes] = await Promise.all([
        supabase.from('testimonials').select('*').eq('project_id', projectId),
        supabase.from('metrics').select('*').eq('project_id', projectId),
        supabase.from('page_sections').select('*').eq('project_id', projectId),
        supabase.from('media_assets').select('*').eq('project_id', projectId),
      ])

      if (testimonialsRes.data) setProjectTestimonials(testimonialsRes.data)
      if (metricsRes.data) {
        const metrics = metricsRes.data.flatMap((m: any) => m.metrics_data?.metrics || [])
        setProjectMetrics(metrics)
      }
      if (sectionsRes.data) setProjectSections(sectionsRes.data)
      if (mediaRes.data) setProjectMedia(mediaRes.data)
    } catch (error) {
      console.error('Error fetching related data:', error)
    }
  }

  const fetchBucketMedia = async (bucket: string) => {
    try {
      const { data, error } = await supabase.storage
        .from(bucket)
        .list()

      if (error) throw error

      const assetsWithUrls = await Promise.all(
        (data || []).map(async (file: any) => {
          const { data: { publicUrl } } = supabase.storage
            .from(bucket)
            .getPublicUrl(file.name)

          return {
            ...file,
            publicUrl,
            bucket,
            name: file.name
          }
        })
      )

      setAvailableMedia(assetsWithUrls)
    } catch (error) {
      console.error('Error fetching bucket media:', error)
    }
  }

  const handleChange = (field: string, value: any) => {
    setFormData({ ...formData, [field]: value })
  }

  const addTechStack = () => {
    if (techStack.trim()) {
      setTechStackList([...techStackList, techStack.trim()])
      setTechStack('')
    }
  }

  const removeTechStack = (index: number) => {
    setTechStackList(techStackList.filter((_, i) => i !== index))
  }

  const addTestimonial = () => {
    setProjectTestimonials([...projectTestimonials, { 
      quote_text: '', 
      author_name: '', 
      author_title: '', 
      author_company: '',
      author_image_url: '',
      rating: 5, 
      is_featured: false 
    }])
  }

  const updateTestimonial = (index: number, field: string, value: any) => {
    const updated = [...projectTestimonials]
    updated[index] = { ...updated[index], [field]: value }
    setProjectTestimonials(updated)
  }

  const removeTestimonial = (index: number) => {
    setProjectTestimonials(projectTestimonials.filter((_, i) => i !== index))
  }

  const addMetric = () => {
    setProjectMetrics([...projectMetrics, { label: '', value: '', prefix: '', suffix: '' }])
  }

  const updateMetric = (index: number, field: string, value: any) => {
    const updated = [...projectMetrics]
    updated[index] = { ...updated[index], [field]: value }
    setProjectMetrics(updated)
  }

  const removeMetric = (index: number) => {
    setProjectMetrics(projectMetrics.filter((_, i) => i !== index))
  }

  const addSection = () => {
    setProjectSections([...projectSections, { 
      section_type: 'OVERVIEW', 
      title: '', 
      body: '', 
      sort_order: projectSections.length 
    }])
  }

  const updateSection = (index: number, field: string, value: any) => {
    const updated = [...projectSections]
    updated[index] = { ...updated[index], [field]: value }
    setProjectSections(updated)
  }

  const removeSection = (index: number) => {
    setProjectSections(projectSections.filter((_, i) => i !== index))
  }

  const addMediaAsset = (asset: any) => {
    setProjectMedia([...projectMedia, {
      bucket_name: asset.bucket,
      file_path: asset.name,
      alt_text: '',
      mime_type: asset.metadata?.mimetype,
      file_size: asset.metadata?.size,
      sort_order: projectMedia.length
    }])
  }

  const removeMediaAsset = (index: number) => {
    setProjectMedia(projectMedia.filter((_, i) => i !== index))
  }

  const updateMediaAsset = (index: number, field: string, value: any) => {
    const updated = [...projectMedia]
    updated[index] = { ...updated[index], [field]: value }
    setProjectMedia(updated)
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()

    if (type === 'projects') {
      const finalFormData = {
        ...formData,
        tech_stack: techStackList
      }

      await onSave(finalFormData, {
        testimonials: projectTestimonials,
        metrics: projectMetrics,
        sections: projectSections,
        mediaAssets: projectMedia
      })
    } else {
      await onSave(formData)
    }
  }

  const modalTitle = type.split('_').map((word: string) => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ')

  // Project Modal with Steps
  if (type === 'projects') {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70">
        <div className="bg-[#131318] rounded-2xl border border-[#2a2a35] w-full max-w-5xl max-h-[90vh] overflow-y-auto scrollbar-thin">
          <div className="flex items-center justify-between p-6 border-b border-[#2a2a35] sticky top-0 bg-[#131318] z-10">
            <div>
              <h3 className="text-xl font-semibold">
                {item ? 'Edit Project' : 'Create New Project'}
              </h3>
              <p className="text-sm text-[#a0a0b0] mt-1">
                {item ? 'Update project details' : 'Fill in the details to create a new project'}
              </p>
            </div>
            <button onClick={onClose} className="p-2 rounded-lg hover:bg-[#1a1a24] transition-colors">
              <X size={20} />
            </button>
          </div>

          <div className="flex gap-2 px-6 pt-4 border-b border-[#2a2a35] overflow-x-auto scrollbar-thin">
            {['Basic Info', 'Content', 'Testimonials', 'Metrics', 'Sections', 'Media'].map((step, index) => (
              <button
                key={step}
                type="button"
                onClick={() => setActiveStep(index + 1)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors whitespace-nowrap ${
                  activeStep === index + 1
                    ? 'bg-gradient-to-r from-[#7727ff] to-[#6417ed] text-white shadow-lg shadow-purple-500/20'
                    : 'bg-[#1a1a24] text-[#a0a0b0] hover:bg-[#2a2a35]'
                }`}
              >
                {index + 1}. {step}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            {activeStep === 1 && (
              <div className="space-y-4 fade-in">
                <h4 className="font-semibold text-lg text-[#a77aff]">Basic Information</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Project Title *</label>
                    <input type="text" required value={formData.title || ''} onChange={(e) => handleChange('title', e.target.value)} className="w-full px-4 py-2.5 bg-[#1a1a24] border border-[#2a2a35] rounded-xl focus:outline-none focus:border-[#7727ff] transition-colors" placeholder="Enter project title" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Client Name *</label>
                    <input type="text" required value={formData.client_name || ''} onChange={(e) => handleChange('client_name', e.target.value)} className="w-full px-4 py-2.5 bg-[#1a1a24] border border-[#2a2a35] rounded-xl focus:outline-none focus:border-[#7727ff] transition-colors" placeholder="Enter client name" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Slug *</label>
                    <input type="text" required value={formData.slug || ''} onChange={(e) => handleChange('slug', e.target.value)} className="w-full px-4 py-2.5 bg-[#1a1a24] border border-[#2a2a35] rounded-xl focus:outline-none focus:border-[#7727ff] transition-colors" placeholder="project-slug" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Category *</label>
                    <select required value={formData.category || ''} onChange={(e) => handleChange('category', e.target.value)} className="w-full px-4 py-2.5 bg-[#1a1a24] border border-[#2a2a35] rounded-xl focus:outline-none focus:border-[#7727ff] transition-colors">
                      <option value="">Select category</option>
                      {categories.map((cat) => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Hero Headline *</label>
                  <input type="text" required value={formData.hero_headline || ''} onChange={(e) => handleChange('hero_headline', e.target.value)} className="w-full px-4 py-2.5 bg-[#1a1a24] border border-[#2a2a35] rounded-xl focus:outline-none focus:border-[#7727ff] transition-colors" placeholder="Enter hero headline" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Visit URL</label>
                  <input type="url" value={formData.visit_url || ''} onChange={(e) => handleChange('visit_url', e.target.value)} className="w-full px-4 py-2.5 bg-[#1a1a24] border border-[#2a2a35] rounded-xl focus:outline-none focus:border-[#7727ff] transition-colors" placeholder="https://example.com" />
                </div>
                <div className="flex gap-6">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" checked={formData.is_published || false} onChange={(e) => handleChange('is_published', e.target.checked)} className="w-4 h-4 rounded border-[#2a2a35] bg-[#1a1a24] focus:ring-[#7727ff]" />
                    <span className="text-sm">Published</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" checked={formData.is_featured || false} onChange={(e) => handleChange('is_featured', e.target.checked)} className="w-4 h-4 rounded border-[#2a2a35] bg-[#1a1a24] focus:ring-[#7727ff]" />
                    <span className="text-sm">Featured</span>
                  </label>
                </div>
              </div>
            )}

            {activeStep === 2 && (
              <div className="space-y-4 fade-in">
                <h4 className="font-semibold text-lg text-[#a77aff]">Content Details</h4>
                <div>
                  <label className="block text-sm font-medium mb-2">Short Description</label>
                  <textarea value={formData.short_description || ''} onChange={(e) => handleChange('short_description', e.target.value)} rows={3} className="w-full px-4 py-2.5 bg-[#1a1a24] border border-[#2a2a35] rounded-xl focus:outline-none focus:border-[#7727ff] transition-colors" placeholder="Brief description of the project" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Full Description</label>
                  <textarea value={formData.full_description || ''} onChange={(e) => handleChange('full_description', e.target.value)} rows={6} className="w-full px-4 py-2.5 bg-[#1a1a24] border border-[#2a2a35] rounded-xl focus:outline-none focus:border-[#7727ff] transition-colors" placeholder="Detailed project description" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Challenge</label>
                    <textarea value={formData.challenge || ''} onChange={(e) => handleChange('challenge', e.target.value)} rows={4} className="w-full px-4 py-2.5 bg-[#1a1a24] border border-[#2a2a35] rounded-xl focus:outline-none focus:border-[#7727ff] transition-colors" placeholder="What was the challenge?" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Solution</label>
                    <textarea value={formData.solution || ''} onChange={(e) => handleChange('solution', e.target.value)} rows={4} className="w-full px-4 py-2.5 bg-[#1a1a24] border border-[#2a2a35] rounded-xl focus:outline-none focus:border-[#7727ff] transition-colors" placeholder="How did you solve it?" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Results</label>
                    <textarea value={formData.results || ''} onChange={(e) => handleChange('results', e.target.value)} rows={4} className="w-full px-4 py-2.5 bg-[#1a1a24] border border-[#2a2a35] rounded-xl focus:outline-none focus:border-[#7727ff] transition-colors" placeholder="What were the results?" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Tech Stack</label>
                  <div className="flex gap-2 mb-3">
                    <input type="text" value={techStack} onChange={(e) => setTechStack(e.target.value)} onKeyPress={(e) => { if (e.key === 'Enter') { e.preventDefault(); addTechStack(); } }} className="flex-1 px-4 py-2.5 bg-[#1a1a24] border border-[#2a2a35] rounded-xl focus:outline-none focus:border-[#7727ff] transition-colors" placeholder="Add technology (e.g., React, Node.js)" />
                    <button type="button" onClick={addTechStack} className="px-4 py-2.5 bg-[#7727ff] rounded-xl hover:bg-[#6417ed] transition-colors">Add</button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {techStackList.map((tech, index) => (
                      <span key={index} className="flex items-center gap-2 px-3 py-1.5 bg-[#7727ff]/20 text-[#a77aff] rounded-full text-sm">
                        {tech}
                        <button type="button" onClick={() => removeTechStack(index)} className="hover:text-white transition-colors">
                          <X size={14} />
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeStep === 3 && (
              <div className="space-y-4 fade-in">
                <div className="flex justify-between items-center">
                  <h4 className="font-semibold text-lg text-[#a77aff]">Project Testimonials</h4>
                  <button type="button" onClick={addTestimonial} className="flex items-center gap-2 px-4 py-2 bg-[#7727ff] rounded-xl hover:bg-[#6417ed] text-sm transition-colors">
                    <Plus size={14} /> Add Testimonial
                  </button>
                </div>
                {projectTestimonials.length === 0 ? (
                  <div className="text-center py-8 text-[#a0a0b0]">
                    <Quote size={32} className="mx-auto mb-2 opacity-50" />
                    <p>No testimonials added yet</p>
                  </div>
                ) : (
                  projectTestimonials.map((testimonial, index) => (
                    <div key={index} className="border border-[#2a2a35] rounded-xl p-4 space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">Testimonial {index + 1}</span>
                        <button type="button" onClick={() => removeTestimonial(index)} className="text-red-400 hover:text-red-500 transition-colors">
                          <Trash2 size={16} />
                        </button>
                      </div>
                      <div>
                        <label className="block text-sm mb-2">Quote *</label>
                        <textarea value={testimonial.quote_text} onChange={(e) => updateTestimonial(index, 'quote_text', e.target.value)} rows={3} className="w-full px-4 py-2.5 bg-[#1a1a24] border border-[#2a2a35] rounded-xl focus:outline-none focus:border-[#7727ff]" placeholder="Enter testimonial quote" />
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div>
                          <label className="block text-sm mb-2">Author Name *</label>
                          <input type="text" value={testimonial.author_name} onChange={(e) => updateTestimonial(index, 'author_name', e.target.value)} className="w-full px-4 py-2.5 bg-[#1a1a24] border border-[#2a2a35] rounded-xl focus:outline-none focus:border-[#7727ff]" placeholder="Author name" />
                        </div>
                        <div>
                          <label className="block text-sm mb-2">Author Title</label>
                          <input type="text" value={testimonial.author_title} onChange={(e) => updateTestimonial(index, 'author_title', e.target.value)} className="w-full px-4 py-2.5 bg-[#1a1a24] border border-[#2a2a35] rounded-xl focus:outline-none focus:border-[#7727ff]" placeholder="e.g., CEO" />
                        </div>
                        <div>
                          <label className="block text-sm mb-2">Rating</label>
                          <select value={testimonial.rating} onChange={(e) => updateTestimonial(index, 'rating', parseInt(e.target.value))} className="w-full px-4 py-2.5 bg-[#1a1a24] border border-[#2a2a35] rounded-xl focus:outline-none focus:border-[#7727ff]">
                            {[1, 2, 3, 4, 5].map((rating) => (
                              <option key={rating} value={rating}>{rating} Star{rating > 1 ? 's' : ''}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {activeStep === 4 && (
              <div className="space-y-4 fade-in">
                <div className="flex justify-between items-center">
                  <h4 className="font-semibold text-lg text-[#a77aff]">Project Metrics</h4>
                  <button type="button" onClick={addMetric} className="flex items-center gap-2 px-4 py-2 bg-[#7727ff] rounded-xl hover:bg-[#6417ed] text-sm transition-colors">
                    <Plus size={14} /> Add Metric
                  </button>
                </div>
                {projectMetrics.length === 0 ? (
                  <div className="text-center py-8 text-[#a0a0b0]">
                    <BarChart3 size={32} className="mx-auto mb-2 opacity-50" />
                    <p>No metrics added yet</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {projectMetrics.map((metric, index) => (
                      <div key={index} className="border border-[#2a2a35] rounded-xl p-4">
                        <div className="flex justify-between items-center mb-3">
                          <span className="font-medium">Metric {index + 1}</span>
                          <button type="button" onClick={() => removeMetric(index)} className="text-red-400 hover:text-red-500 transition-colors">
                            <Trash2 size={16} />
                          </button>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="block text-sm mb-2">Label *</label>
                            <input type="text" value={metric.label} onChange={(e) => updateMetric(index, 'label', e.target.value)} className="w-full px-4 py-2.5 bg-[#1a1a24] border border-[#2a2a35] rounded-xl focus:outline-none focus:border-[#7727ff]" placeholder="e.g., Increase" />
                          </div>
                          <div>
                            <label className="block text-sm mb-2">Value *</label>
                            <input type="text" value={metric.value} onChange={(e) => updateMetric(index, 'value', e.target.value)} className="w-full px-4 py-2.5 bg-[#1a1a24] border border-[#2a2a35] rounded-xl focus:outline-none focus:border-[#7727ff]" placeholder="e.g., 300" />
                          </div>
                          <div>
                            <label className="block text-sm mb-2">Prefix</label>
                            <input type="text" value={metric.prefix} onChange={(e) => updateMetric(index, 'prefix', e.target.value)} className="w-full px-4 py-2.5 bg-[#1a1a24] border border-[#2a2a35] rounded-xl focus:outline-none focus:border-[#7727ff]" placeholder="e.g., +" />
                          </div>
                          <div>
                            <label className="block text-sm mb-2">Suffix</label>
                            <input type="text" value={metric.suffix} onChange={(e) => updateMetric(index, 'suffix', e.target.value)} className="w-full px-4 py-2.5 bg-[#1a1a24] border border-[#2a2a35] rounded-xl focus:outline-none focus:border-[#7727ff]" placeholder="e.g., %" />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeStep === 5 && (
              <div className="space-y-4 fade-in">
                <div className="flex justify-between items-center">
                  <h4 className="font-semibold text-lg text-[#a77aff]">Page Sections</h4>
                  <button type="button" onClick={addSection} className="flex items-center gap-2 px-4 py-2 bg-[#7727ff] rounded-xl hover:bg-[#6417ed] text-sm transition-colors">
                    <Plus size={14} /> Add Section
                  </button>
                </div>
                {projectSections.length === 0 ? (
                  <div className="text-center py-8 text-[#a0a0b0]">
                    <Layout size={32} className="mx-auto mb-2 opacity-50" />
                    <p>No sections added yet</p>
                  </div>
                ) : (
                  projectSections.map((section, index) => (
                    <div key={index} className="border border-[#2a2a35] rounded-xl p-4 space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">Section {index + 1}</span>
                        <button type="button" onClick={() => removeSection(index)} className="text-red-400 hover:text-red-500 transition-colors">
                          <Trash2 size={16} />
                        </button>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-sm mb-2">Type</label>
                          <select value={section.section_type} onChange={(e) => updateSection(index, 'section_type', e.target.value)} className="w-full px-4 py-2.5 bg-[#1a1a24] border border-[#2a2a35] rounded-xl focus:outline-none focus:border-[#7727ff]">
                            {sectionTypes.map((type) => (
                              <option key={type} value={type}>{type}</option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm mb-2">Title</label>
                          <input type="text" value={section.title} onChange={(e) => updateSection(index, 'title', e.target.value)} className="w-full px-4 py-2.5 bg-[#1a1a24] border border-[#2a2a35] rounded-xl focus:outline-none focus:border-[#7727ff]" placeholder="Section title" />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm mb-2">Body</label>
                        <textarea value={section.body} onChange={(e) => updateSection(index, 'body', e.target.value)} rows={3} className="w-full px-4 py-2.5 bg-[#1a1a24] border border-[#2a2a35] rounded-xl focus:outline-none focus:border-[#7727ff]" placeholder="Section content" />
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {activeStep === 6 && (
              <div className="space-y-4 fade-in">
                <div className="flex justify-between items-center">
                  <h4 className="font-semibold text-lg text-[#a77aff]">Project Media</h4>
                </div>
                
                <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin">
                  {bucketNames.map((bucket) => (
                    <button key={bucket} type="button" onClick={() => setSelectedBucket(bucket)} className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors whitespace-nowrap ${
                      selectedBucket === bucket ? 'bg-[#7727ff] text-white' : 'bg-[#1a1a24] text-[#a0a0b0] hover:bg-[#2a2a35]'
                    }`}>
                      {bucket}
                    </button>
                  ))}
                </div>

                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3 max-h-64 overflow-y-auto scrollbar-thin">
                  {availableMedia.map((asset: any) => (
                    <button key={asset.name} type="button" onClick={() => addMediaAsset(asset)} className="relative group aspect-square bg-[#1a1a24] rounded-lg overflow-hidden border border-[#2a2a35] hover:border-[#7727ff] transition-colors">
                      {asset.metadata?.mimetype?.startsWith('image/') ? (
                        <img src={asset.publicUrl} alt={asset.name} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <FileText size={24} className="text-[#a0a0b0]" />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-colors flex items-center justify-center">
                        <Plus size={20} className="text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    </button>
                  ))}
                </div>

                <div>
                  <h5 className="font-medium mb-2">Selected Media ({projectMedia.length})</h5>
                  {projectMedia.length === 0 ? (
                    <p className="text-sm text-[#a0a0b0]">No media selected yet</p>
                  ) : (
                    <div className="space-y-2">
                      {projectMedia.map((media: any, index: number) => (
                        <div key={index} className="flex items-center gap-3 p-3 bg-[#1a1a24] border border-[#2a2a35] rounded-lg">
                          <div className="w-10 h-10 bg-[#2a2a35] rounded-lg flex items-center justify-center">
                            <ImageIcon size={16} className="text-[#a0a0b0]" />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium">{media.file_path}</p>
                            <input type="text" value={media.alt_text} onChange={(e) => updateMediaAsset(index, 'alt_text', e.target.value)} className="w-full mt-1 px-3 py-1.5 bg-[#2a2a35] border border-[#3a3a45] rounded-lg text-sm focus:outline-none focus:border-[#7727ff]" placeholder="Alt text" />
                          </div>
                          <button type="button" onClick={() => removeMediaAsset(index)} className="text-red-400 hover:text-red-500 transition-colors">
                            <Trash2 size={16} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            <div className="flex justify-between pt-4 border-t border-[#2a2a35]">
              <button type="button" onClick={() => setActiveStep(Math.max(1, activeStep - 1))} disabled={activeStep === 1} className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#1a1a24] hover:bg-[#2a2a35] disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
                <ChevronLeft size={16} /> Previous
              </button>
              {activeStep < 6 ? (
                <button type="button" onClick={() => setActiveStep(activeStep + 1)} className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#7727ff] hover:bg-[#6417ed] transition-colors">
                  Next <ChevronRight size={16} />
                </button>
              ) : (
                <button type="submit" className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#7727ff] hover:bg-[#6417ed] transition-colors">
                  <Save size={16} />
                  {item ? 'Update Project' : 'Create Project'}
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    )
  }

  // Other modal types
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70">
      <div className="bg-[#131318] rounded-2xl border border-[#2a2a35] w-full max-w-2xl max-h-[90vh] overflow-y-auto scrollbar-thin">
        <div className="flex items-center justify-between p-6 border-b border-[#2a2a35] sticky top-0 bg-[#131318] z-10">
          <div>
            <h3 className="text-xl font-semibold">
              {item ? `Edit ${modalTitle}` : `Create ${modalTitle}`}
            </h3>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-[#1a1a24] transition-colors">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {type === 'services' && (
            <>
              <div>
                <label className="block text-sm font-medium mb-2">Service Name *</label>
                <input type="text" required value={formData.name || ''} onChange={(e) => handleChange('name', e.target.value)} className="w-full px-4 py-2.5 bg-[#1a1a24] border border-[#2a2a35] rounded-xl focus:outline-none focus:border-[#7727ff]" placeholder="Enter service name" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Description</label>
                <textarea value={formData.description || ''} onChange={(e) => handleChange('description', e.target.value)} rows={3} className="w-full px-4 py-2.5 bg-[#1a1a24] border border-[#2a2a35] rounded-xl focus:outline-none focus:border-[#7727ff]" placeholder="Service description" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Icon</label>
                <input type="text" value={formData.icon || ''} onChange={(e) => handleChange('icon', e.target.value)} className="w-full px-4 py-2.5 bg-[#1a1a24] border border-[#2a2a35] rounded-xl focus:outline-none focus:border-[#7727ff]" placeholder="Icon name" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Sort Order</label>
                <input type="number" value={formData.sort_order || 0} onChange={(e) => handleChange('sort_order', parseInt(e.target.value))} className="w-full px-4 py-2.5 bg-[#1a1a24] border border-[#2a2a35] rounded-xl focus:outline-none focus:border-[#7727ff]" />
              </div>
            </>
          )}

          {type === 'testimonials' && (
            <>
              <div>
                <label className="block text-sm font-medium mb-2">Project *</label>
                <select required value={formData.project_id || ''} onChange={(e) => handleChange('project_id', e.target.value)} className="w-full px-4 py-2.5 bg-[#1a1a24] border border-[#2a2a35] rounded-xl focus:outline-none focus:border-[#7727ff]">
                  <option value="">Select project</option>
                  {projects.map((project: any) => (
                    <option key={project.id} value={project.id}>{project.title}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Quote *</label>
                <textarea required value={formData.quote_text || ''} onChange={(e) => handleChange('quote_text', e.target.value)} rows={3} className="w-full px-4 py-2.5 bg-[#1a1a24] border border-[#2a2a35] rounded-xl focus:outline-none focus:border-[#7727ff]" placeholder="Enter testimonial quote" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Author Name *</label>
                  <input type="text" required value={formData.author_name || ''} onChange={(e) => handleChange('author_name', e.target.value)} className="w-full px-4 py-2.5 bg-[#1a1a24] border border-[#2a2a35] rounded-xl focus:outline-none focus:border-[#7727ff]" placeholder="Author name" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Author Title</label>
                  <input type="text" value={formData.author_title || ''} onChange={(e) => handleChange('author_title', e.target.value)} className="w-full px-4 py-2.5 bg-[#1a1a24] border border-[#2a2a35] rounded-xl focus:outline-none focus:border-[#7727ff]" placeholder="e.g., CEO" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Rating (1-5)</label>
                <input type="number" min="1" max="5" value={formData.rating || 5} onChange={(e) => handleChange('rating', parseInt(e.target.value))} className="w-full px-4 py-2.5 bg-[#1a1a24] border border-[#2a2a35] rounded-xl focus:outline-none focus:border-[#7727ff]" />
              </div>
            </>
          )}

          {type === 'blog_posts' && (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Title *</label>
                  <input type="text" required value={formData.title || ''} onChange={(e) => handleChange('title', e.target.value)} className="w-full px-4 py-2.5 bg-[#1a1a24] border border-[#2a2a35] rounded-xl focus:outline-none focus:border-[#7727ff]" placeholder="Post title" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Slug *</label>
                  <input type="text" required value={formData.slug || ''} onChange={(e) => handleChange('slug', e.target.value)} className="w-full px-4 py-2.5 bg-[#1a1a24] border border-[#2a2a35] rounded-xl focus:outline-none focus:border-[#7727ff]" placeholder="post-slug" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Category</label>
                <select value={formData.category || ''} onChange={(e) => handleChange('category', e.target.value)} className="w-full px-4 py-2.5 bg-[#1a1a24] border border-[#2a2a35] rounded-xl focus:outline-none focus:border-[#7727ff]">
                  <option value="">Select category</option>
                  {blogCategories.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Excerpt</label>
                <textarea value={formData.excerpt || ''} onChange={(e) => handleChange('excerpt', e.target.value)} rows={3} className="w-full px-4 py-2.5 bg-[#1a1a24] border border-[#2a2a35] rounded-xl focus:outline-none focus:border-[#7727ff]" placeholder="Brief excerpt" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Status</label>
                <select value={formData.status || 'draft'} onChange={(e) => handleChange('status', e.target.value)} className="w-full px-4 py-2.5 bg-[#1a1a24] border border-[#2a2a35] rounded-xl focus:outline-none focus:border-[#7727ff]">
                  <option value="draft">Draft</option>
                  <option value="scheduled">Scheduled</option>
                  <option value="published">Published</option>
                  <option value="archived">Archived</option>
                </select>
              </div>
            </>
          )}

          {type === 'team_members' && (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Name *</label>
                  <input type="text" required value={formData.name || ''} onChange={(e) => handleChange('name', e.target.value)} className="w-full px-4 py-2.5 bg-[#1a1a24] border border-[#2a2a35] rounded-xl focus:outline-none focus:border-[#7727ff]" placeholder="Full name" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Role *</label>
                  <input type="text" required value={formData.role || ''} onChange={(e) => handleChange('role', e.target.value)} className="w-full px-4 py-2.5 bg-[#1a1a24] border border-[#2a2a35] rounded-xl focus:outline-none focus:border-[#7727ff]" placeholder="e.g., Senior Developer" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Bio</label>
                <textarea value={formData.bio || ''} onChange={(e) => handleChange('bio', e.target.value)} rows={3} className="w-full px-4 py-2.5 bg-[#1a1a24] border border-[#2a2a35] rounded-xl focus:outline-none focus:border-[#7727ff]" placeholder="Team member bio" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <input type="email" value={formData.email || ''} onChange={(e) => handleChange('email', e.target.value)} className="w-full px-4 py-2.5 bg-[#1a1a24] border border-[#2a2a35] rounded-xl focus:outline-none focus:border-[#7727ff]" placeholder="email@example.com" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">LinkedIn URL</label>
                  <input type="url" value={formData.linkedin_url || ''} onChange={(e) => handleChange('linkedin_url', e.target.value)} className="w-full px-4 py-2.5 bg-[#1a1a24] border border-[#2a2a35] rounded-xl focus:outline-none focus:border-[#7727ff]" placeholder="https://linkedin.com/in/..." />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">GitHub URL</label>
                  <input type="url" value={formData.github_url || ''} onChange={(e) => handleChange('github_url', e.target.value)} className="w-full px-4 py-2.5 bg-[#1a1a24] border border-[#2a2a35] rounded-xl focus:outline-none focus:border-[#7727ff]" placeholder="https://github.com/..." />
                </div>
              </div>
            </>
          )}

          {type === 'faqs' && (
            <>
              <div>
                <label className="block text-sm font-medium mb-2">Category</label>
                <select value={formData.category || ''} onChange={(e) => handleChange('category', e.target.value)} className="w-full px-4 py-2.5 bg-[#1a1a24] border border-[#2a2a35] rounded-xl focus:outline-none focus:border-[#7727ff]">
                  <option value="">Select category</option>
                  {faqCategories.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Question *</label>
                <input type="text" required value={formData.question || ''} onChange={(e) => handleChange('question', e.target.value)} className="w-full px-4 py-2.5 bg-[#1a1a24] border border-[#2a2a35] rounded-xl focus:outline-none focus:border-[#7727ff]" placeholder="Enter question" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Answer *</label>
                <textarea required value={formData.answer || ''} onChange={(e) => handleChange('answer', e.target.value)} rows={4} className="w-full px-4 py-2.5 bg-[#1a1a24] border border-[#2a2a35] rounded-xl focus:outline-none focus:border-[#7727ff]" placeholder="Enter answer" />
              </div>
            </>
          )}

          <div className="flex justify-end gap-3 pt-4 border-t border-[#2a2a35]">
            <button type="button" onClick={onClose} className="px-4 py-2.5 rounded-xl bg-[#1a1a24] hover:bg-[#2a2a35] transition-colors">
              Cancel
            </button>
            <button type="submit" className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#7727ff] hover:bg-[#6417ed] transition-colors">
              <Save size={16} />
              {item ? 'Update' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

// ServicesTab Component
function ServicesTab({ services, onEdit, onDelete, onCreate }: any) {
  return (
    <div className="space-y-4 fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Services</h2>
          <p className="text-sm text-[#a0a0b0] mt-1">Manage your services</p>
        </div>
        <button
          onClick={onCreate}
          className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#7727ff] to-[#6417ed] rounded-xl hover:shadow-lg hover:shadow-purple-500/30 transition-all"
        >
          <Plus size={16} />
          New Service
        </button>
      </div>

      {services.length === 0 ? (
        <div className="glass-effect rounded-2xl border border-[#2a2a35] p-12 text-center">
          <Wrench size={48} className="mx-auto text-[#a0a0b0] mb-4" />
          <p className="text-[#a0a0b0]">No services yet</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map((service: any) => (
            <div key={service.id} className="glass-effect rounded-2xl border border-[#2a2a35] p-6 hover-glow transition-all group">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-semibold">{service.name}</h3>
                  {service.icon && (
                    <p className="text-sm text-[#a0a0b0] mt-1">Icon: {service.icon}</p>
                  )}
                </div>
                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => onEdit(service)}
                    className="p-2 rounded-lg bg-[#2a2a35] hover:bg-[#3a3a45] transition-colors"
                  >
                    <Edit size={14} />
                  </button>
                  <button
                    onClick={() => onDelete(service.id)}
                    className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-colors"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
              {service.description && (
                <p className="text-sm text-[#a0a0b0]">{service.description}</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// TestimonialsTab Component
function TestimonialsTab({ testimonials, projects, onEdit, onDelete, onCreate }: any) {
  return (
    <div className="space-y-4 fade-in">
      <div className="flex justify-end">
        <button
          onClick={onCreate}
          className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#7727ff] to-[#6417ed] rounded-xl hover:shadow-lg hover:shadow-purple-500/30 transition-all"
        >
          <Plus size={16} />
          New Testimonial
        </button>
      </div>

      {testimonials.length === 0 ? (
        <div className="glass-effect rounded-2xl border border-[#2a2a35] p-12 text-center">
          <Quote size={48} className="mx-auto text-[#a0a0b0] mb-4" />
          <p className="text-[#a0a0b0]">No testimonials yet</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {testimonials.map((testimonial: any) => (
            <div key={testimonial.id} className="glass-effect rounded-2xl border border-[#2a2a35] p-6 hover-glow transition-all group">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      size={16}
                      className={star <= testimonial.rating ? 'text-yellow-400' : 'text-[#2a2a35]'}
                      fill={star <= testimonial.rating ? 'currentColor' : 'none'}
                    />
                  ))}
                </div>
                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => onEdit(testimonial)}
                    className="p-2 rounded-lg bg-[#2a2a35] hover:bg-[#3a3a45] transition-colors"
                  >
                    <Edit size={14} />
                  </button>
                  <button
                    onClick={() => onDelete(testimonial.id)}
                    className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-colors"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
              <blockquote className="text-[#a0a0b0] italic mb-4">
                "{testimonial.quote_text}"
              </blockquote>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#7727ff] to-[#6417ed] flex items-center justify-center">
                  <span className="text-white font-bold">
                    {testimonial.author_name.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="font-medium">{testimonial.author_name}</p>
                  <p className="text-sm text-[#a0a0b0]">
                    {testimonial.author_title} {testimonial.author_company && `at ${testimonial.author_company}`}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// BlogTab Component
function BlogTab({ posts, onEdit, onDelete, onCreate }: any) {
  return (
    <div className="space-y-4 fade-in">
      <div className="flex justify-end">
        <button
          onClick={onCreate}
          className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#7727ff] to-[#6417ed] rounded-xl hover:shadow-lg hover:shadow-purple-500/30 transition-all"
        >
          <Plus size={16} />
          New Post
        </button>
      </div>

      {posts.length === 0 ? (
        <div className="glass-effect rounded-2xl border border-[#2a2a35] p-12 text-center">
          <Newspaper size={48} className="mx-auto text-[#a0a0b0] mb-4" />
          <p className="text-[#a0a0b0]">No blog posts yet</p>
        </div>
      ) : (
        <div className="glass-effect rounded-2xl border border-[#2a2a35] overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#1a1a24]/50">
              <tr className="text-left text-sm text-[#a0a0b0]">
                <th className="px-6 py-3 font-medium">Title</th>
                <th className="px-6 py-3 font-medium">Category</th>
                <th className="px-6 py-3 font-medium">Status</th>
                <th className="px-6 py-3 font-medium">Views</th>
                <th className="px-6 py-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#2a2a35]">
              {posts.map((post: any) => (
                <tr key={post.id} className="hover:bg-[#1a1a24]/50 transition-colors group">
                  <td className="px-6 py-4">
                    <p className="font-medium">{post.title}</p>
                    <p className="text-sm text-[#a0a0b0]">{post.slug}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 text-xs bg-[#7727ff]/20 text-[#a77aff] rounded-full">
                      {post.category}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 text-xs rounded-full ${
                      post.status === 'published' ? 'bg-green-500/20 text-green-400' :
                      post.status === 'draft' ? 'bg-gray-500/20 text-gray-400' :
                      post.status === 'scheduled' ? 'bg-blue-500/20 text-blue-400' :
                      'bg-red-500/20 text-red-400'
                    }`}>
                      {post.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">{post.view_count}</td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => onEdit(post)}
                        className="p-2 rounded-lg bg-[#2a2a35] hover:bg-[#3a3a45] transition-colors"
                      >
                        <Edit size={14} />
                      </button>
                      <button
                        onClick={() => onDelete(post.id)}
                        className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-colors"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

// ContactsTab Component
function ContactsTab({ contacts, onEdit, onDelete, onStatusChange }: any) {
  const [filter, setFilter] = useState('ALL')

  const filteredContacts = contacts.filter((contact: any) => {
    return filter === 'ALL' || contact.status === filter
  })

  return (
    <div className="space-y-4 fade-in">
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin">
        <button
          onClick={() => setFilter('ALL')}
          className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors whitespace-nowrap ${
            filter === 'ALL' ? 'bg-gradient-to-r from-[#7727ff] to-[#6417ed] text-white' : 'bg-[#131318] text-[#a0a0b0]'
          }`}
        >
          All ({contacts.length})
        </button>
        {contactStatuses.map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors whitespace-nowrap ${
              filter === status ? 'bg-gradient-to-r from-[#7727ff] to-[#6417ed] text-white' : 'bg-[#131318] text-[#a0a0b0]'
            }`}
          >
            {status} ({contacts.filter((c: any) => c.status === status).length})
          </button>
        ))}
      </div>

      {filteredContacts.length === 0 ? (
        <div className="glass-effect rounded-2xl border border-[#2a2a35] p-12 text-center">
          <Inbox size={48} className="mx-auto text-[#a0a0b0] mb-4" />
          <p className="text-[#a0a0b0]">No contacts found</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredContacts.map((contact: any) => (
            <div key={contact.id} className="glass-effect rounded-2xl border border-[#2a2a35] p-6 hover-glow transition-all">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-semibold">{contact.name}</h3>
                    {!contact.is_read && (
                      <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" title="Unread" />
                    )}
                  </div>
                  <div className="flex flex-wrap gap-4 text-sm text-[#a0a0b0]">
                    <span className="flex items-center gap-1">
                      <Mail size={14} /> {contact.email}
                    </span>
                    {contact.phone && (
                      <span className="flex items-center gap-1">
                        <Phone size={14} /> {contact.phone}
                      </span>
                    )}
                    <span className="flex items-center gap-1">
                      <Calendar size={14} /> {new Date(contact.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  {contact.message && (
                    <p className="mt-3 text-sm text-[#a0a0b0]">{contact.message}</p>
                  )}
                </div>
                <div className="flex sm:flex-col gap-2 items-start sm:items-end">
                  <select
                    value={contact.status}
                    onChange={(e) => onStatusChange(contact.id, e.target.value)}
                    className="px-3 py-2 bg-[#1a1a24] border border-[#2a2a35] rounded-xl text-sm focus:outline-none focus:border-[#7727ff]"
                  >
                    {contactStatuses.map((status) => (
                      <option key={status} value={status}>{status}</option>
                    ))}
                  </select>
                  <div className="flex gap-2">
                    <button
                      onClick={() => onEdit(contact)}
                      className="p-2 rounded-lg bg-[#2a2a35] hover:bg-[#3a3a45] transition-colors"
                    >
                      <Edit size={14} />
                    </button>
                    <button
                      onClick={() => onDelete(contact.id)}
                      className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-colors"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// TeamTab Component
function TeamTab({ members, onEdit, onDelete, onCreate }: any) {
  return (
    <div className="space-y-4 fade-in">
      <div className="flex justify-end">
        <button
          onClick={onCreate}
          className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#7727ff] to-[#6417ed] rounded-xl hover:shadow-lg hover:shadow-purple-500/30 transition-all"
        >
          <Plus size={16} />
          New Team Member
        </button>
      </div>

      {members.length === 0 ? (
        <div className="glass-effect rounded-2xl border border-[#2a2a35] p-12 text-center">
          <Users2 size={48} className="mx-auto text-[#a0a0b0] mb-4" />
          <p className="text-[#a0a0b0]">No team members yet</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {members.map((member: any) => (
            <div key={member.id} className="glass-effect rounded-2xl border border-[#2a2a35] p-6 hover-glow transition-all group">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#7727ff] to-[#6417ed] flex items-center justify-center">
                  {member.image_url ? (
                    <img src={member.image_url} alt={member.name} className="w-full h-full rounded-full object-cover" />
                  ) : (
                    <span className="text-white font-bold text-lg">
                      {member.name.charAt(0)}
                    </span>
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold">{member.name}</h3>
                  <p className="text-sm text-[#a77aff]">{member.role}</p>
                </div>
                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => onEdit(member)}
                    className="p-2 rounded-lg bg-[#2a2a35] hover:bg-[#3a3a45] transition-colors"
                  >
                    <Edit size={14} />
                  </button>
                  <button
                    onClick={() => onDelete(member.id)}
                    className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-colors"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
              {member.bio && (
                <p className="text-sm text-[#a0a0b0] mb-4">{member.bio}</p>
              )}
              <div className="flex gap-2">
                {member.email && (
                  <a href={`mailto:${member.email}`} className="p-2 rounded-lg bg-[#1a1a24] hover:bg-[#2a2a35] transition-colors">
                    <Mail size={14} />
                  </a>
                )}
                {member.linkedin_url && (
                  <a href={member.linkedin_url} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-[#1a1a24] hover:bg-[#2a2a35] transition-colors">
                    <LinkedInIcon size={14} />
                  </a>
                )}
                {member.twitter_url && (
                  <a href={member.twitter_url} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-[#1a1a24] hover:bg-[#2a2a35] transition-colors">
                    <TwitterIcon size={14} />
                  </a>
                )}
                {member.github_url && (
                  <a href={member.github_url} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-[#1a1a24] hover:bg-[#2a2a35] transition-colors">
                    <GitHubIcon size={14} />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// FAQsTab Component
function FAQsTab({ faqs, onEdit, onDelete, onCreate }: any) {
  return (
    <div className="space-y-4 fade-in">
      <div className="flex justify-end">
        <button
          onClick={onCreate}
          className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#7727ff] to-[#6417ed] rounded-xl hover:shadow-lg hover:shadow-purple-500/30 transition-all"
        >
          <Plus size={16} />
          New FAQ
        </button>
      </div>

      {faqs.length === 0 ? (
        <div className="glass-effect rounded-2xl border border-[#2a2a35] p-12 text-center">
          <HelpCircle size={48} className="mx-auto text-[#a0a0b0] mb-4" />
          <p className="text-[#a0a0b0]">No FAQs yet</p>
        </div>
      ) : (
        <div className="space-y-3">
          {faqs.map((faq: any) => (
            <div key={faq.id} className="glass-effect rounded-2xl border border-[#2a2a35] p-6 hover-glow transition-all group">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="px-3 py-1 text-xs bg-[#7727ff]/20 text-[#a77aff] rounded-full">
                      {faq.category}
                    </span>
                  </div>
                  <h3 className="font-semibold mb-2">{faq.question}</h3>
                  <p className="text-sm text-[#a0a0b0]">{faq.answer}</p>
                </div>
                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => onEdit(faq)}
                    className="p-2 rounded-lg bg-[#2a2a35] hover:bg-[#3a3a45] transition-colors"
                  >
                    <Edit size={14} />
                  </button>
                  <button
                    onClick={() => onDelete(faq.id)}
                    className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-colors"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
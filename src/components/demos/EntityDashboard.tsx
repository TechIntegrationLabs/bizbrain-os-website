'use client';

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Building2,
  Users,
  Briefcase,
  Search,
  Filter,
  Plus,
  Mail,
  Phone,
  MapPin,
  ExternalLink,
  MoreHorizontal,
  X,
  Calendar,
  DollarSign,
  Clock,
  Star,
  Activity,
  ChevronRight,
  FileText,
  MessageSquare,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { spring, staggerContainer, staggerItem } from '@/lib/animations';

type EntityType = 'client' | 'partner' | 'vendor';

interface Entity {
  id: string;
  name: string;
  type: EntityType;
  company?: string;
  email: string;
  phone?: string;
  location?: string;
  status: 'active' | 'inactive' | 'pending';
  avatar?: string;
  tags: string[];
  revenue?: number;
  projects?: number;
  lastContact?: string;
  description?: string;
  starred?: boolean;
}

// Sample entity data
const sampleEntities: Entity[] = [
  // Clients
  {
    id: 'client-1',
    name: 'Tim Garcia',
    type: 'client',
    company: 'Garcia Construction',
    email: 'tim@garciaconstruction.com',
    phone: '+1 555-0123',
    location: 'Austin, TX',
    status: 'active',
    tags: ['BuildTrack', 'Priority', 'Construction'],
    revenue: 45000,
    projects: 3,
    lastContact: '2 days ago',
    description: 'Primary client for BuildTrack construction management platform.',
    starred: true,
  },
  {
    id: 'client-2',
    name: 'Elite Dental Force',
    type: 'client',
    company: 'EDF Healthcare',
    email: 'contact@elitedentalforce.com',
    phone: '+1 555-0456',
    location: 'Phoenix, AZ',
    status: 'active',
    tags: ['EDF-Pro', 'Healthcare', 'Enterprise'],
    revenue: 250000,
    projects: 1,
    lastContact: '1 week ago',
    description: 'Dental practice management platform project.',
    starred: true,
  },
  {
    id: 'client-3',
    name: 'GetEducated',
    type: 'client',
    company: 'GetEducated Inc',
    email: 'hello@geteducated.com',
    location: 'Denver, CO',
    status: 'active',
    tags: ['Content Engine', 'Education'],
    revenue: 15000,
    projects: 1,
    lastContact: '3 days ago',
    description: 'Content production system for education platform.',
  },
  {
    id: 'client-4',
    name: 'Sarah Mitchell',
    type: 'client',
    company: 'Mitchell Realty',
    email: 'sarah@mitchellrealty.com',
    location: 'Seattle, WA',
    status: 'pending',
    tags: ['Real Estate', 'New Lead'],
    lastContact: 'Yesterday',
    description: 'Potential client for real estate CRM project.',
  },

  // Partners
  {
    id: 'partner-1',
    name: 'Disruptors Media',
    type: 'partner',
    company: 'Disruptors Media LLC',
    email: 'team@disruptorsmedia.com',
    phone: '+1 555-0789',
    location: 'Los Angeles, CA',
    status: 'active',
    tags: ['Strategic', 'Development', 'Marketing'],
    revenue: 120000,
    projects: 5,
    lastContact: 'Today',
    description: 'Strategic development and marketing partner.',
    starred: true,
  },
  {
    id: 'partner-2',
    name: 'Emerald Beacon',
    type: 'partner',
    company: 'Emerald Beacon Inc',
    email: 'partners@emeraldbeacon.com',
    phone: '+1 555-0321',
    location: 'San Francisco, CA',
    status: 'active',
    tags: ['Development', 'Healthcare', 'AI'],
    revenue: 85000,
    projects: 2,
    lastContact: '4 days ago',
    description: 'Technical development partner specializing in healthcare.',
  },
  {
    id: 'partner-3',
    name: 'CreativeForge',
    type: 'partner',
    company: 'CreativeForge Studios',
    email: 'hello@creativeforge.io',
    location: 'New York, NY',
    status: 'inactive',
    tags: ['Design', 'UI/UX'],
    projects: 1,
    lastContact: '2 months ago',
    description: 'Design and branding partner.',
  },

  // Vendors
  {
    id: 'vendor-1',
    name: 'Supabase',
    type: 'vendor',
    company: 'Supabase Inc',
    email: 'support@supabase.com',
    status: 'active',
    tags: ['Database', 'Auth', 'Storage'],
    revenue: -2400,
    description: 'Backend-as-a-service provider for database and authentication.',
  },
  {
    id: 'vendor-2',
    name: 'Vercel',
    type: 'vendor',
    company: 'Vercel Inc',
    email: 'support@vercel.com',
    status: 'active',
    tags: ['Hosting', 'CDN', 'Serverless'],
    revenue: -1200,
    description: 'Hosting and deployment platform.',
  },
  {
    id: 'vendor-3',
    name: 'Anthropic',
    type: 'vendor',
    company: 'Anthropic PBC',
    email: 'support@anthropic.com',
    status: 'active',
    tags: ['AI', 'API', 'Claude'],
    revenue: -5000,
    description: 'AI model provider for Claude integration.',
    starred: true,
  },
  {
    id: 'vendor-4',
    name: 'OpenAI',
    type: 'vendor',
    company: 'OpenAI Inc',
    email: 'support@openai.com',
    status: 'active',
    tags: ['AI', 'API', 'GPT'],
    revenue: -800,
    description: 'AI model provider for GPT integrations.',
  },
  {
    id: 'vendor-5',
    name: 'Notion',
    type: 'vendor',
    company: 'Notion Labs',
    email: 'support@notion.so',
    status: 'active',
    tags: ['Documentation', 'Collaboration'],
    revenue: -480,
    description: 'Documentation and project management tool.',
  },
];

const entityTypeConfig = {
  client: {
    icon: Building2,
    color: '#10b981',
    label: 'Clients',
    singular: 'Client',
    description: 'Entities that pay you',
  },
  partner: {
    icon: Users,
    color: '#8b5cf6',
    label: 'Partners',
    singular: 'Partner',
    description: 'Strategic relationships',
  },
  vendor: {
    icon: Briefcase,
    color: '#f59e0b',
    label: 'Vendors',
    singular: 'Vendor',
    description: 'Services you pay for',
  },
};

const statusConfig = {
  active: { color: '#10b981', label: 'Active' },
  inactive: { color: '#64748b', label: 'Inactive' },
  pending: { color: '#f59e0b', label: 'Pending' },
};

interface EntityCardProps {
  entity: Entity;
  onClick: () => void;
}

const EntityCard: React.FC<EntityCardProps> = ({ entity, onClick }) => {
  const config = entityTypeConfig[entity.type];
  const Icon = config.icon;

  return (
    <motion.div
      variants={staggerItem}
      whileHover={{ y: -4, scale: 1.01 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="group relative bg-surface/50 rounded-xl border border-white/10 p-4 cursor-pointer hover:border-white/20 transition-colors"
    >
      {/* Starred indicator */}
      {entity.starred && (
        <div className="absolute top-3 right-3">
          <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
        </div>
      )}

      {/* Header */}
      <div className="flex items-start gap-3 mb-3">
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center text-lg font-bold"
          style={{ backgroundColor: `${config.color}20`, color: config.color }}
        >
          {entity.avatar || entity.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="font-medium text-white truncate">{entity.name}</h4>
          {entity.company && (
            <p className="text-sm text-white/40 truncate">{entity.company}</p>
          )}
        </div>
      </div>

      {/* Status Badge */}
      <div className="flex items-center gap-2 mb-3">
        <span
          className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs"
          style={{
            backgroundColor: `${statusConfig[entity.status].color}20`,
            color: statusConfig[entity.status].color,
          }}
        >
          <span
            className="w-1.5 h-1.5 rounded-full"
            style={{ backgroundColor: statusConfig[entity.status].color }}
          />
          {statusConfig[entity.status].label}
        </span>
        <Icon className="w-3.5 h-3.5" style={{ color: config.color }} />
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-1 mb-3">
        {entity.tags.slice(0, 3).map((tag, i) => (
          <span
            key={i}
            className="px-2 py-0.5 rounded text-xs bg-white/5 text-white/50"
          >
            {tag}
          </span>
        ))}
        {entity.tags.length > 3 && (
          <span className="px-2 py-0.5 rounded text-xs bg-white/5 text-white/40">
            +{entity.tags.length - 3}
          </span>
        )}
      </div>

      {/* Stats */}
      <div className="flex items-center justify-between text-xs">
        {entity.revenue !== undefined && (
          <span className={entity.revenue >= 0 ? 'text-emerald-400' : 'text-amber-400'}>
            <DollarSign className="w-3 h-3 inline mr-0.5" />
            {Math.abs(entity.revenue).toLocaleString()}
            {entity.revenue < 0 ? '/yr' : ''}
          </span>
        )}
        {entity.lastContact && (
          <span className="text-white/40">
            <Clock className="w-3 h-3 inline mr-1" />
            {entity.lastContact}
          </span>
        )}
      </div>

      {/* Hover arrow */}
      <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
        <ChevronRight className="w-4 h-4 text-white/40" />
      </div>
    </motion.div>
  );
};

interface EntityDetailModalProps {
  entity: Entity;
  onClose: () => void;
}

const EntityDetailModal: React.FC<EntityDetailModalProps> = ({ entity, onClose }) => {
  const config = entityTypeConfig[entity.type];
  const Icon = config.icon;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        transition={spring.default}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-lg bg-surface border border-white/10 rounded-2xl overflow-hidden"
      >
        {/* Header */}
        <div className="relative p-6 border-b border-white/10">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-white/40 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-start gap-4">
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center text-xl font-bold"
              style={{ backgroundColor: `${config.color}20`, color: config.color }}
            >
              {entity.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-semibold text-white">{entity.name}</h2>
                {entity.starred && (
                  <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                )}
              </div>
              {entity.company && (
                <p className="text-white/60">{entity.company}</p>
              )}
              <div className="flex items-center gap-2 mt-2">
                <span
                  className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs"
                  style={{
                    backgroundColor: `${statusConfig[entity.status].color}20`,
                    color: statusConfig[entity.status].color,
                  }}
                >
                  {statusConfig[entity.status].label}
                </span>
                <span
                  className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs"
                  style={{ backgroundColor: `${config.color}20`, color: config.color }}
                >
                  <Icon className="w-3 h-3" />
                  {config.singular}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Description */}
          {entity.description && (
            <div>
              <h4 className="text-xs uppercase tracking-wide text-white/40 mb-2">About</h4>
              <p className="text-white/70 text-sm">{entity.description}</p>
            </div>
          )}

          {/* Contact Info */}
          <div>
            <h4 className="text-xs uppercase tracking-wide text-white/40 mb-3">Contact</h4>
            <div className="space-y-2">
              <div className="flex items-center gap-3 text-sm">
                <Mail className="w-4 h-4 text-white/40" />
                <a href={`mailto:${entity.email}`} className="text-cyan-400 hover:underline">
                  {entity.email}
                </a>
              </div>
              {entity.phone && (
                <div className="flex items-center gap-3 text-sm">
                  <Phone className="w-4 h-4 text-white/40" />
                  <span className="text-white/70">{entity.phone}</span>
                </div>
              )}
              {entity.location && (
                <div className="flex items-center gap-3 text-sm">
                  <MapPin className="w-4 h-4 text-white/40" />
                  <span className="text-white/70">{entity.location}</span>
                </div>
              )}
            </div>
          </div>

          {/* Stats */}
          <div>
            <h4 className="text-xs uppercase tracking-wide text-white/40 mb-3">Stats</h4>
            <div className="grid grid-cols-3 gap-4">
              {entity.revenue !== undefined && (
                <div className="bg-white/5 rounded-lg p-3 text-center">
                  <DollarSign className="w-5 h-5 mx-auto text-emerald-400 mb-1" />
                  <div className={cn('font-semibold', entity.revenue >= 0 ? 'text-emerald-400' : 'text-amber-400')}>
                    ${Math.abs(entity.revenue).toLocaleString()}
                  </div>
                  <div className="text-xs text-white/40">
                    {entity.revenue >= 0 ? 'Revenue' : 'Cost/yr'}
                  </div>
                </div>
              )}
              {entity.projects !== undefined && (
                <div className="bg-white/5 rounded-lg p-3 text-center">
                  <FileText className="w-5 h-5 mx-auto text-cyan-400 mb-1" />
                  <div className="font-semibold text-white">{entity.projects}</div>
                  <div className="text-xs text-white/40">Projects</div>
                </div>
              )}
              {entity.lastContact && (
                <div className="bg-white/5 rounded-lg p-3 text-center">
                  <Calendar className="w-5 h-5 mx-auto text-violet-400 mb-1" />
                  <div className="font-semibold text-white text-sm">{entity.lastContact}</div>
                  <div className="text-xs text-white/40">Last Contact</div>
                </div>
              )}
            </div>
          </div>

          {/* Tags */}
          <div>
            <h4 className="text-xs uppercase tracking-wide text-white/40 mb-3">Tags</h4>
            <div className="flex flex-wrap gap-2">
              {entity.tags.map((tag, i) => (
                <span
                  key={i}
                  className="px-3 py-1 rounded-full text-sm bg-white/5 text-white/70 border border-white/10"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-white/10 flex items-center justify-between bg-white/[0.02]">
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 text-white/60 hover:text-white hover:bg-white/10 transition-colors text-sm">
            <MessageSquare className="w-4 h-4" />
            Message
          </button>
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-cyan-500/20 text-cyan-400 hover:bg-cyan-500/30 transition-colors text-sm">
            <ExternalLink className="w-4 h-4" />
            Open in BB1
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

interface EntityDashboardProps {
  className?: string;
}

export const EntityDashboard: React.FC<EntityDashboardProps> = ({ className }) => {
  const [activeTab, setActiveTab] = useState<EntityType>('client');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEntity, setSelectedEntity] = useState<Entity | null>(null);
  const [statusFilter, setStatusFilter] = useState<string | null>(null);

  // Filter entities
  const filteredEntities = useMemo(() => {
    return sampleEntities.filter((entity) => {
      const matchesType = entity.type === activeTab;
      const matchesSearch =
        searchQuery === '' ||
        entity.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        entity.company?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        entity.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesStatus = !statusFilter || entity.status === statusFilter;
      return matchesType && matchesSearch && matchesStatus;
    });
  }, [activeTab, searchQuery, statusFilter]);

  // Calculate stats
  const stats = useMemo(() => {
    const typeEntities = sampleEntities.filter((e) => e.type === activeTab);
    return {
      total: typeEntities.length,
      active: typeEntities.filter((e) => e.status === 'active').length,
      revenue: typeEntities.reduce((sum, e) => sum + (e.revenue || 0), 0),
    };
  }, [activeTab]);

  return (
    <div className={cn('rounded-2xl bg-surface/80 border border-white/10 overflow-hidden', className)}>
      {/* Header */}
      <div className="p-4 border-b border-white/10">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center">
              <Building2 className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <h3 className="font-semibold text-white">Entity Dashboard</h3>
              <p className="text-xs text-white/40">Manage all your business relationships</p>
            </div>
          </div>

          <button className="flex items-center gap-2 px-3 py-2 rounded-lg bg-cyan-500/20 text-cyan-400 hover:bg-cyan-500/30 transition-colors text-sm">
            <Plus className="w-4 h-4" />
            Add Entity
          </button>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-1 p-1 bg-white/5 rounded-xl">
          {(Object.keys(entityTypeConfig) as EntityType[]).map((type) => {
            const config = entityTypeConfig[type];
            const Icon = config.icon;
            const count = sampleEntities.filter((e) => e.type === type).length;
            return (
              <button
                key={type}
                onClick={() => setActiveTab(type)}
                className={cn(
                  'flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg transition-all text-sm',
                  activeTab === type
                    ? 'bg-white/10 text-white'
                    : 'text-white/50 hover:text-white/70'
                )}
              >
                <Icon className="w-4 h-4" />
                <span>{config.label}</span>
                <span
                  className={cn(
                    'px-1.5 py-0.5 rounded text-xs',
                    activeTab === type ? 'bg-white/20' : 'bg-white/5'
                  )}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Stats Bar */}
      <div className="px-4 py-3 border-b border-white/10 bg-white/[0.02] flex items-center justify-between">
        <div className="flex items-center gap-6 text-sm">
          <div>
            <span className="text-white/40">Total: </span>
            <span className="text-white font-medium">{stats.total}</span>
          </div>
          <div>
            <span className="text-white/40">Active: </span>
            <span className="text-emerald-400 font-medium">{stats.active}</span>
          </div>
          {stats.revenue !== 0 && (
            <div>
              <span className="text-white/40">{activeTab === 'vendor' ? 'Cost: ' : 'Revenue: '}</span>
              <span className={stats.revenue >= 0 ? 'text-emerald-400' : 'text-amber-400'}>
                ${Math.abs(stats.revenue).toLocaleString()}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Search & Filters */}
      <div className="p-4 border-b border-white/10 flex items-center gap-3">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
          <input
            type="text"
            placeholder={`Search ${entityTypeConfig[activeTab].label.toLowerCase()}...`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-cyan-500/50"
          />
        </div>

        {/* Status Filter */}
        <div className="flex items-center gap-1 p-1 bg-white/5 rounded-lg">
          {['all', 'active', 'pending', 'inactive'].map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status === 'all' ? null : status)}
              className={cn(
                'px-3 py-1.5 rounded text-xs transition-colors capitalize',
                (status === 'all' && !statusFilter) || statusFilter === status
                  ? 'bg-white/10 text-white'
                  : 'text-white/40 hover:text-white/60'
              )}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Entity Grid */}
      <div className="p-4 h-[400px] overflow-y-auto">
        <motion.div
          variants={staggerContainer(0.05)}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          {filteredEntities.map((entity) => (
            <EntityCard
              key={entity.id}
              entity={entity}
              onClick={() => setSelectedEntity(entity)}
            />
          ))}
        </motion.div>

        {filteredEntities.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4">
              <Search className="w-8 h-8 text-white/20" />
            </div>
            <p className="text-white/40 mb-2">No {entityTypeConfig[activeTab].label.toLowerCase()} found</p>
            <p className="text-white/30 text-sm">Try adjusting your search or filters</p>
          </div>
        )}
      </div>

      {/* Entity Detail Modal */}
      <AnimatePresence>
        {selectedEntity && (
          <EntityDetailModal
            entity={selectedEntity}
            onClose={() => setSelectedEntity(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default EntityDashboard;

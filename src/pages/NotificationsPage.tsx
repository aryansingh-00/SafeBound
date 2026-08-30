import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { NotificationHeader } from '../components/notifications/NotificationHeader';
import { NotificationTabs, TabFilter } from '../components/notifications/NotificationTabs';
import { NotificationCardItem } from '../components/notifications/NotificationCardItem';
import { NotificationDetailDrawer } from '../components/notifications/NotificationDetailDrawer';
import { NotificationEmptyState } from '../components/notifications/NotificationEmptyState';
import { NotificationGroupView } from '../components/notifications/NotificationGroupView';
import { INITIAL_NOTIFICATIONS, NotificationItem } from '../data/notificationsData';
import { AlertCircle, CheckCircle2, Sparkles } from 'lucide-react';

export const NotificationsPage: React.FC = () => {
  const navigate = useNavigate();

  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);
  const [activeTab, setActiveTab] = useState<TabFilter>('all');
  const [selectedDrawerItem, setSelectedDrawerItem] = useState<NotificationItem | null>(null);

  // Statistics
  const totalCount = notifications.length;
  const unreadCount = notifications.filter((n) => n.state === 'unread' || n.state === 'action_required').length;
  const actionRequiredCount = notifications.filter((n) => n.state === 'action_required').length;

  const categoryCounts: Record<string, { total: number; unread: number }> = {
    all: { total: totalCount, unread: unreadCount },
    trips: {
      total: notifications.filter((n) => n.category === 'trips').length,
      unread: notifications.filter((n) => n.category === 'trips' && (n.state === 'unread' || n.state === 'action_required')).length,
    },
    bookings: {
      total: notifications.filter((n) => n.category === 'bookings').length,
      unread: notifications.filter((n) => n.category === 'bookings' && (n.state === 'unread' || n.state === 'action_required')).length,
    },
    price: {
      total: notifications.filter((n) => n.category === 'price').length,
      unread: notifications.filter((n) => n.category === 'price' && n.state === 'unread').length,
    },
    weather: {
      total: notifications.filter((n) => n.category === 'weather').length,
      unread: notifications.filter((n) => n.category === 'weather' && n.state === 'unread').length,
    },
    safety: {
      total: notifications.filter((n) => n.category === 'safety').length,
      unread: notifications.filter((n) => n.category === 'safety' && n.state === 'unread').length,
    },
    promotions: {
      total: notifications.filter((n) => n.category === 'promotions').length,
      unread: notifications.filter((n) => n.category === 'promotions' && n.state === 'unread').length,
    },
  };

  const handleMarkAllAsRead = () => {
    setNotifications((prev) =>
      prev.map((n) => (n.state === 'unread' ? { ...n, state: 'read' } : n))
    );
  };

  const handleSelectItem = (item: NotificationItem) => {
    // Mark clicked item as read if it was unread
    if (item.state === 'unread') {
      setNotifications((prev) =>
        prev.map((n) => (n.id === item.id ? { ...n, state: 'read' } : n))
      );
    }
    setSelectedDrawerItem(item);
  };

  const handlePrimaryAction = (item: NotificationItem) => {
    if (item.actions.primaryAction.startsWith('/')) {
      navigate(item.actions.primaryAction);
    } else if (item.actions.primaryAction === 'approve_hotel') {
      handleApproveAction(item.id);
    } else {
      setSelectedDrawerItem(item);
    }
  };

  const handleApproveAction = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) =>
        n.id === id
          ? {
              ...n,
              state: 'resolved',
              title: '✓ Hotel Alternative Approved: 4★ Executive Pine Suite Locked',
              summary: 'Confirmed with Cedar View Retreat. ₹700 savings refunded to your account balance.',
              agentAction: {
                ...n.agentAction,
                resolutionState: '✓ Approved & Locked',
              },
            }
          : n
      )
    );
    setSelectedDrawerItem(null);
    alert('✓ Alternative Hotel Approved! Updated voucher issued.');
  };

  // Filtered Notifications
  const filteredNotifications = notifications.filter((n) => {
    if (activeTab === 'all') return true;
    return n.category === activeTab;
  });

  // Group Mussoorie Trip items
  const mussoorieItems = filteredNotifications.filter((n) => n.tripId === 'SB-MUSSOORIE-4D');
  const otherItems = filteredNotifications.filter((n) => n.tripId !== 'SB-MUSSOORIE-4D');

  return (
    <div className="bg-[#FBFBFE] min-h-screen py-8 sm:py-12 pb-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* 1. Page Header with Stats */}
        <NotificationHeader
          totalCount={totalCount}
          unreadCount={unreadCount}
          actionRequiredCount={actionRequiredCount}
          onMarkAllAsRead={handleMarkAllAsRead}
        />

        {/* 2. Category Filter Tabs */}
        <NotificationTabs
          activeTab={activeTab}
          onSelectTab={setActiveTab}
          categoryCounts={categoryCounts}
        />

        {/* 3. Action Required Callout Banner (If applicable) */}
        {actionRequiredCount > 0 && activeTab === 'all' && (
          <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-xs text-rose-900 flex items-start justify-between gap-3 animate-fadeIn">
            <div className="flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <div>
                <strong className="font-extrabold block">1 Critical Action Requires Your Approval</strong>
                <p className="text-rose-700 mt-0.5">
                  SafeBound discovered a room overbooking in Mussoorie and auto-negotiated a superior suite at ₹700 lower cost. Please confirm to lock the reservation.
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => {
                const item = notifications.find((n) => n.state === 'action_required');
                if (item) setSelectedDrawerItem(item);
              }}
              className="px-3.5 py-1.5 bg-rose-600 hover:bg-rose-700 text-white font-extrabold text-xs rounded-xl shadow-xs transition shrink-0"
            >
              Review Now
            </button>
          </div>
        )}

        {/* 4. Notification Stream */}
        {filteredNotifications.length === 0 ? (
          <NotificationEmptyState />
        ) : (
          <div className="space-y-4">
            
            {/* Mussoorie Trip Cluster (If on 'all' or 'trips' and has > 1 items) */}
            {(activeTab === 'all' || activeTab === 'trips') && mussoorieItems.length > 1 ? (
              <>
                <NotificationGroupView
                  tripName="🏔️ Active Trip: Mussoorie Alpine Retreat (Sep 15–18)"
                  items={mussoorieItems}
                  onSelect={handleSelectItem}
                  onPrimaryAction={handlePrimaryAction}
                />

                {otherItems.map((item) => (
                  <NotificationCardItem
                    key={item.id}
                    item={item}
                    onSelect={handleSelectItem}
                    onPrimaryAction={handlePrimaryAction}
                  />
                ))}
              </>
            ) : (
              filteredNotifications.map((item) => (
                <NotificationCardItem
                  key={item.id}
                  item={item}
                  onSelect={handleSelectItem}
                  onPrimaryAction={handlePrimaryAction}
                />
              ))
            )}

          </div>
        )}

      </div>

      {/* Notification Deep-Dive Detail Drawer */}
      <NotificationDetailDrawer
        item={selectedDrawerItem}
        isOpen={!!selectedDrawerItem}
        onClose={() => setSelectedDrawerItem(null)}
        onApproveAction={handleApproveAction}
      />

    </div>
  );
};

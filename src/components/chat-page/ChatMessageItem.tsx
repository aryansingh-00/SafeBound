import React from 'react';
import { Bot, User, Sparkles } from 'lucide-react';
import { InChatRequirementCard, ExtractedRequirements } from './InChatRequirementCard';
import { InChatProcessingCard } from './InChatProcessingCard';
import { InChatDestinationCards } from './InChatDestinationCards';
import { InChatPackageCard } from './InChatPackageCard';
import { InChatOptimizationCard } from './InChatOptimizationCard';
import { InChatComparisonTable } from './InChatComparisonTable';
import { InChatApprovalCard } from './InChatApprovalCard';

export interface ChatMessageData {
  id: string;
  sender: 'user' | 'agent';
  text?: string;
  timestamp: string;
  cardType?: 'requirement' | 'processing' | 'destinations' | 'package' | 'optimization' | 'comparison' | 'approval';
  requirementsData?: ExtractedRequirements;
  quickReplies?: string[];
  isOptimized?: boolean;
}

interface ChatMessageItemProps {
  message: ChatMessageData;
  onQuickReplyClick: (reply: string) => void;
  onSelectDestination: (destName: string) => void;
  onReviewPackage: () => void;
  onFindBetterDeal: () => void;
  onCompareAlternatives: () => void;
  onApplyOptimization: () => void;
  onChooseComparedDestination: (destName: string, price: number) => void;
  onProceedToBookingReview: () => void;
}

export const ChatMessageItem: React.FC<ChatMessageItemProps> = ({
  message,
  onQuickReplyClick,
  onSelectDestination,
  onReviewPackage,
  onFindBetterDeal,
  onCompareAlternatives,
  onApplyOptimization,
  onChooseComparedDestination,
  onProceedToBookingReview,
}) => {
  const isUser = message.sender === 'user';

  return (
    <div className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} my-3 animate-fadeIn`}>
      
      <div className={`flex items-end gap-2.5 max-w-[95%] sm:max-w-[85%] ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
        
        {/* Avatar */}
        <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 mb-1 shadow-xs ${
          isUser
            ? 'bg-slate-800 text-white'
            : 'bg-gradient-to-tr from-brand-600 to-indigo-600 text-white'
        }`}>
          {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
        </div>

        {/* Message Bubble & Content Cards */}
        <div className="space-y-2">
          
          {message.text && (
            <div
              className={`p-4 rounded-3xl text-xs sm:text-sm font-medium leading-relaxed shadow-xs ${
                isUser
                  ? 'bg-brand-600 text-white rounded-br-xs'
                  : 'bg-white text-slate-800 border border-slate-200/90 rounded-bl-xs'
              }`}
            >
              {message.text}
            </div>
          )}

          {/* Card: Requirement Extraction */}
          {message.cardType === 'requirement' && message.requirementsData && (
            <InChatRequirementCard requirements={message.requirementsData} />
          )}

          {/* Card: Live Processing */}
          {message.cardType === 'processing' && (
            <InChatProcessingCard />
          )}

          {/* Card: Destination Candidates */}
          {message.cardType === 'destinations' && (
            <InChatDestinationCards
              onSelectDestination={onSelectDestination}
              onCompare={onCompareAlternatives}
            />
          )}

          {/* Card: Generated Package */}
          {message.cardType === 'package' && (
            <InChatPackageCard
              onReviewPackage={onReviewPackage}
              onFindBetterDeal={onFindBetterDeal}
              onCompareAlternatives={onCompareAlternatives}
              isOptimized={message.isOptimized}
            />
          )}

          {/* Card: Live Optimization */}
          {message.cardType === 'optimization' && (
            <InChatOptimizationCard onApplyOptimization={onApplyOptimization} />
          )}

          {/* Card: Package Comparison */}
          {message.cardType === 'comparison' && (
            <InChatComparisonTable onChooseDestination={onChooseComparedDestination} />
          )}

          {/* Card: Ready to Book Approval */}
          {message.cardType === 'approval' && (
            <InChatApprovalCard
              destination="Mussoorie"
              duration="4 Days"
              travellers={2}
              totalPrice={message.isOptimized ? 29850 : 31300}
              maxBudget={40000}
              onProceedToBookingReview={onProceedToBookingReview}
            />
          )}

          {/* Quick Replies */}
          {message.quickReplies && message.quickReplies.length > 0 && (
            <div className="flex flex-wrap gap-1.5 pt-1">
              {message.quickReplies.map((reply, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => onQuickReplyClick(reply)}
                  className="text-xs font-bold text-brand-700 bg-brand-50 hover:bg-brand-100 border border-brand-200 rounded-full px-3 py-1.5 transition text-left shadow-2xs"
                >
                  {reply}
                </button>
              ))}
            </div>
          )}

        </div>

      </div>

    </div>
  );
};

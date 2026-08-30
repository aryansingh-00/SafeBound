import { JourneyTimelineNode } from './packageBuilderTypes';

export interface TimelineValidationResult {
  isCompatible: boolean;
  errors: string[];
  warnings: string[];
  validatedNodes: JourneyTimelineNode[];
}

export class TimelineCompatibilityEngine {
  /**
   * Validates the chronological feasibility of a multi-modal journey graph.
   */
  public static validateTimeline(nodes: JourneyTimelineNode[]): TimelineValidationResult {
    const errors: string[] = [];
    const warnings: string[] = [];

    const validatedNodes = nodes.map((node, index) => {
      let isValid = true;
      let validationMessage = '✓ Timing and buffer verified';

      if (index > 0) {
        const prevNode = nodes[index - 1];

        // Convert simple HH:MM AM/PM to minutes for comparison
        const prevEndMinutes = this.parseTimeToMinutes(prevNode.endTime);
        const currentStartMinutes = this.parseTimeToMinutes(node.startTime);

        if (currentStartMinutes < prevEndMinutes) {
          isValid = false;
          validationMessage = `❌ Timing conflict: Starts at ${node.startTime} before previous service ends at ${prevNode.endTime}.`;
          errors.push(validationMessage);
        } else if (currentStartMinutes - prevEndMinutes < prevNode.bufferMinutesAfter) {
          isValid = false;
          validationMessage = `⚠️ Insufficient transfer buffer: Only ${currentStartMinutes - prevEndMinutes}m buffer available (minimum required: ${prevNode.bufferMinutesAfter}m).`;
          warnings.push(validationMessage);
        }
      }

      return {
        ...node,
        isValid,
        validationMessage,
      };
    });

    return {
      isCompatible: errors.length === 0,
      errors,
      warnings,
      validatedNodes,
    };
  }

  private static parseTimeToMinutes(timeStr: string): number {
    if (!timeStr) return 0;
    const parts = timeStr.trim().split(/[:\s]/);
    if (parts.length < 2) return 0;

    let hours = parseInt(parts[0], 10);
    const minutes = parseInt(parts[1], 10) || 0;
    const period = parts[2]?.toUpperCase();

    if (period === 'PM' && hours !== 12) hours += 12;
    if (period === 'AM' && hours === 12) hours = 0;

    return hours * 60 + minutes;
  }
}

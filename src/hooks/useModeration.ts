import { useQuery } from '@tanstack/react-query';
import { moderationService } from '../api/services/moderation';

export const useModeration = () => {
    const { data, isLoading, error, refetch: fetchLogs } = useQuery({
        queryKey: ['moderation', 'logs'],
        queryFn: () => moderationService.getAuditLogs(),
    });

    const exportLogs = () => {
        const logsToExport = data?.data || [];
        if (logsToExport.length === 0) {
            console.log("No logs to export.");
            return;
        }

        console.log("Exporting logs...");
        const csvContent = "data:text/csv;charset=utf-8," 
            + "ID,Action,Moderator,Status,Timestamp\n"
            + logsToExport.map(l => `${l.id},"${l.action}",${l.moderator},${l.status},${l.timestamp}`).join("\n");
        
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "moderation_logs.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return { 
        logs: data?.data || [], 
        totalLogs: data?.total || 0,
        fetchLogs, 
        isLoading, 
        error,
        exportLogs 
    };
};
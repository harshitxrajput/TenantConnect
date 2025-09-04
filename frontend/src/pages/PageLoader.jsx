import { Loader2 } from "lucide-react";

const PageLoader = ({ message = "Loading, please wait..." }) => {
    return (
        <div className="fixed inset-0 bg-green-50 bg-opacity-95 flex flex-col justify-center items-center z-50">
            <div className="flex flex-col items-center space-y-4">
                <Loader2 className="text-green-500 w-16 h-16 animate-spin" />
                <p className="text-green-700 text-lg font-medium text-center">{message}</p>
            </div>
        </div>
    );
};

export default PageLoader;

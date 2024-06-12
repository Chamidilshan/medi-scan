import { Loader2 } from 'lucide-react';

export const Icons = {
  spinner: Loader2,
};

function Loader() {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-slate-200/20 backdrop-blur-sm">
    <Icons.spinner className="h-10 w-10 animate-spin" />;
  </div>
  )
}

export default Loader;
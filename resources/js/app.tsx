import { createInertiaApp } from '@inertiajs/react';
import type { ResolvedComponent } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { Toaster } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { initializeTheme } from '@/hooks/use-appearance';
import AppLayout from '@/layouts/app-layout';
import AuthLayout from '@/layouts/auth-layout';
import SettingsLayout from '@/layouts/settings/layout';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

void createInertiaApp({
    title: (title) => (title ? `${title} - ${appName}` : appName),
    resolve: (name) => {
        // Halaman modul ditulis dengan format NamaModul::nama-halaman
        const path = name.includes('::')
            ? `../../Modules/${name.split('::')[0]}/resources/js/pages/${name.split('::')[1]}.tsx`
            : `./pages/${name}.tsx`;

        return resolvePageComponent<ResolvedComponent>(
            path,
            import.meta.glob<ResolvedComponent>([
                './pages/**/*.tsx',
                '../../Modules/*/resources/js/pages/**/*.tsx',
            ]),
        );
    },
    layout: (name) => {
        switch (true) {
            case name === 'welcome':
                return null;
            // Halaman modul dan dashboard membungkus dirinya sendiri dengan <AppLayout>
            case name.includes('::'):
                return null;
            case name === 'dashboard':
                return null;
            case name.startsWith('auth/'):
                return AuthLayout;
            case name.startsWith('settings/'):
                return [AppLayout, SettingsLayout];
            default:
                return AppLayout;
        }
    },
    strictMode: true,
    withApp(app) {
        return (
            <TooltipProvider delayDuration={0}>
                {app}
                <Toaster />
            </TooltipProvider>
        );
    },
    progress: {
        color: '#4B5563',
    },
});

// This will set light / dark mode on load...
initializeTheme();
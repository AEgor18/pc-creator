export { cn } from 'cn';

export function getTabValue(pathname: string) {
	if (pathname === '/dashboard' || pathname.startsWith('/dashboard/'))
		return 'dashboard';
	if (
		pathname === '/builds/explore' ||
		pathname.startsWith('/builds/explore')
	)
		return 'explore';
	if (pathname === '/builds' || pathname.startsWith('/builds'))
		return 'builds';

	return '';
}

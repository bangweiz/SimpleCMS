export const sidebarConfig: SidebarConfig = {
    mode: "inline",
    defaultSelectedKeys: ['pages'],
    items: [
        {
            key: 'pages',
            label: 'Pages',
            to: '/admin/pages'
        },
        {
            key: 'images',
            label: 'Images',
            to: '/admin/images'
        },
        {
            key: 'users',
            label: 'Users',
            to: '/admin/users'
        },
        {
            key: 'website settings',
            label: 'Website Settings',
            to: '/admin/website-settings'
        }
    ]
}

interface SidebarConfig {
    mode: 'horizontal' | 'vertical' | 'inline'
    defaultSelectedKeys: string[]
    items: Items[]
}

interface Items {
    key: string,
    label: string,
    to: string
}
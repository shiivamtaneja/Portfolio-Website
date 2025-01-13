import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { pathNames } from "./constants/path-names";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function matchPath(pathname: string, isFirstLoad: boolean) {
  if (pathname === '/') {
    return isFirstLoad ? "Shivam Taneja" : "<Home />";
  }

  if (pathname in pathNames.common) {
    return isFirstLoad ?
      pathNames.common[pathname as keyof typeof pathNames.common]
      :
      `<${pathNames.common[pathname as keyof typeof pathNames.common]} />`
  }

  if (pathname.startsWith('/project')) {
    const slug = pathname.split('/project/')[1];

    if (slug && pathNames.projects[slug as keyof typeof pathNames.projects]) {
      return isFirstLoad ?
        pathNames.projects[slug as keyof typeof pathNames.projects]
        :
        `<${pathNames.projects[slug as keyof typeof pathNames.projects]} />`
    }
  }

  return 'Not Found';
}
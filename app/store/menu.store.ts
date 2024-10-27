import {create} from "zustand";
import { devtools } from 'zustand/middleware'

interface Menu {
  label: string
  key: string
  link: string
}

type MenuStore = {
  menuList: Menu[]
  currentMenu: string
  changeMenu: (newMenu) => void
  getMenuLink: () => string
}

export const useMenuStore = create<MenuStore>()(devtools((set, get) => ({
  menuList: [
    {
      label: 'Home',
      key: 'home',
      link: '/'
    },
    {
      label: 'Compress Image',
      key: 'compress',
      link: '/compress'
    },
    {
      label: 'Convert Image',
      key: 'convert',
      link: '/convert'
    },
    {
      label: 'Resize Image',
      key: 'resize',
      link: '/resize'
    },
    {
      label: 'Flip/Flop Image',
      key: 'flip-flop',
      link: '/flip-flop'
    }
  ],
  currentMenu: 'home',
  changeMenu: (newMenu) => {
    set((state) => ({ ...state, currentMenu: newMenu }))
  },
  getMenuLink: () => {
    const link = get().menuList.find((obj) => get().currentMenu === obj.key)

    if (link) {
      return link.link
    } else {
      return '/'
    }
  }
})))

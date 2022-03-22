export const adminMenu = [
  {
    //quan ly nguoi dung
    name: "menu.admin.manage-user",
    menus: [
      {
        name: "menu.admin.crud",
        link: "/system/user-manage",
      },
      {
        name: "menu.admin.crud-redux",
        link: "/system/user-redux",
      },

      {
        name: "menu.admin.manage-doctor",
        link: "/system/doctor-manage",
      },

      {
        name: "menu.doctor.manage-schedule",
        link: "/doctor/manage-schedule",
      },
      {
        name: "menu.doctor.manage-clinic",
        link: "/doctor/manage-clinic",
      },

      // {
      //   name: "menu.admin.manage-user",
      //   link: "/system/user-manage",
      // subMenus: [
      //   {
      //     name: "menu.system.system-administrator.user-manage",
      //     link: "/system/user-manage",
      //   },
      //   {
      //     name: "menu.system.system-administrator.user-redux",
      //     link: "/system/user-redux",
      //   },
      // ],
      //},
      // { name: 'menu.system.system-parameter.header', link: '/system/system-parameter' },
    ],
  },
  {
    //quan ly phong kham
    name: "menu.admin.clinic",
    menus: [
      {
        name: "menu.admin.manage-clinic",
        link: "/system/clinic-manage",
      },
    ],
  },
  {
    //quan ly chuyên khoa
    name: "menu.admin.specialty",
    menus: [
      {
        name: "menu.admin.manage-specialty",
        link: "/system/specialty-manage",
      },
    ],
  },
  {
    //quan ly cam nang
    name: "menu.admin.handbook",
    menus: [
      {
        name: "menu.admin.manage-handbook",
        link: "/system/handbook-manage",
      },
    ],
  },
];
export const doctorMenu = [
  {
    name: "menu.admin.manage-user",
    menus: [
      {
        name: "menu.doctor.manage-schedule",
        link: "/doctor/manage-schedule",
      },
    ],
  },
];

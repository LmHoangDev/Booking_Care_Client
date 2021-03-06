export const adminMenu = [
  {
    //quan ly nguoi dung
    name: "menu.admin.manage-user",
    menus: [
      // {
      //   name: "menu.admin.crud",
      //   link: "/system/user-manage",
      // },
      {
        name: "menu.admin.crud-redux",
        link: "/system/user-redux",
      },

      {
        name: "menu.admin.manage-doctor",
        link: "/system/doctor-manage",
      },
      {
        name: "menu.admin.home-manage",
        link: "/system/home-manage",
      },
      // {
      //   name: "menu.doctor.manage-schedule",
      //   link: "/doctor/manage-schedule",
      // },
      {
        name: "menu.admin.create-user",
        link: "/system/create-account",
      },
      // {
      //   name: "menu.doctor.manage-clinic",
      //   link: "/doctor/manage-clinic",
      // },
      // {
      //   name: "menu.doctor.manage-clinic",
      //   link: "/system/clinic-list",
      // },

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
        name: "menu.admin.create-clinic",
        link: "/system/create-clinic",
      },
      {
        name: "menu.admin.manage-clinic",
        link: "/system/clinic-list",
      },
    ],
  },
  {
    //quan ly chuyên khoa
    name: "menu.admin.specialty",
    menus: [
      {
        name: "menu.admin.create-specialty",
        link: "/system/specialty-manage",
      },
      {
        name: "menu.admin.manage-specialty",
        link: "/system/specialty-list",
      },
    ],
  },
  {
    //quan ly bai viet
    name: "menu.admin.post",
    menus: [
      {
        name: "menu.admin.create-post",
        link: "/system/create-post",
      },
      {
        name: "menu.admin.manage-post",
        link: "/system/post-list",
      },
    ],
  },
  {
    name: "menu.admin.schedule",
    menus: [
      {
        name: "menu.doctor.manage-schedule",
        link: "/system/manage-schedule",
      },
    ],
  },
  // {
  //   //quan ly cam nang
  //   name: "menu.admin.handbook",
  //   menus: [
  //     {
  //       name: "menu.admin.manage-handbook",
  //       link: "/system/handbook-manage",
  //     },
  //   ],
  // },
];
export const doctorMenu = [
  {
    name: "menu.doctor.manage-module",
    menus: [
      {
        name: "menu.admin.home-manage",
        link: "/system/home-manage",
      },
      // {
      //   name: "menu.doctor.manage-schedule",
      //   link: "/doctor/manage-schedule-detail",
      // },
      {
        name: "menu.doctor.manage-patient",
        link: "/doctor/manage-patient",
      },
    ],
  },
];

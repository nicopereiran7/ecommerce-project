//LAYOUT
import LayoutBasic from "../layouts/LayoutBasic";

//PAGES
import Home from "../pages/Home";
import Comprar from "../pages/Comprar";
import QuienesSomos from "../pages/QuienesSomos";
import Product from "../pages/Product";
import Category from "../pages/Category";
import SubCategory from "../pages/SubCategory";
import MiCarrito from "../pages/MiCarrito";
import Perfil from "../pages/Perfil";
import Error404 from "../pages/Error404";

// ADMIN PAGES
import AdminHome from "../pages/Perfil/Home";
import AdminRegister from "../pages/Perfil/Register";
import AdminUsers from "../pages/Perfil/Users";
import AdminProducts from "../pages/Perfil/Products";
import AdminCategories from "../pages/Perfil/Categories";
import AdminSubCategories from "../pages/Perfil/SubCategories";

// export default function Routes() {
//   return (
//     <Switch>
//       <Route path="/" exact>
//         <Home />
//       </Route>
//       <Route path="/comprar" exact>
//         <Comprar />
//       </Route>
//       <Route path="/quienes-somos" exact>
//         <QuienesSomos />
//       </Route>
//       <Route path="/mi-perfil" exact>
//         <Perfil />
//       </Route>
//       <Route path="/mi-carrito" exact>
//         <MiCarrito />
//       </Route>
//       <Route path="/categoria/:slug" exact>
//         <Category />
//       </Route>
//       <Route path="/sub-categoria/:slug" exact>
//         <h1>Sub-Categorias</h1>
//       </Route>
//       <Route path="/:url">
//         <h1>La pagina no existe</h1>
//       </Route>
//     </Switch>
//   );
// }

const routes = [
  {
    path: "/",
    component: LayoutBasic,
    exact: false,
    routes: [
      {
        path: "/",
        component: Home,
        exact: true,
      },
      {
        path: "/comprar",
        component: Comprar,
        exact: true,
      },
      {
        path: "/quienes-somos",
        component: QuienesSomos,
        exact: true,
      },
      {
        path: "/mi-carrito",
        component: MiCarrito,
        exact: true,
      },
      {
        path: "/producto/:slug",
        component: Product,
        exact: true,
      },
      {
        path: "/categoria/:slug",
        component: Category,
        exact: true,
      },
      {
        path: "/sub-categoria/:slug",
        component: SubCategory,
        exact: true,
      },
      {
        path: "/mi-perfil",
        component: Perfil,
        exact: false,
        routes: [
          {
            path: "/mi-perfil",
            component: AdminHome,
            exact: true,
            admin: false,
          },
          {
            path: "/mi-perfil/registros",
            component: AdminRegister,
            exact: true,
            admin: false,
          },
          {
            path: "/mi-perfil/usuarios",
            component: AdminUsers,
            exact: true,
            admin: true,
          },
          {
            path: "/mi-perfil/productos",
            component: AdminProducts,
            exact: true,
            admin: true,
          },
          {
            path: "/mi-perfil/categorias",
            component: AdminCategories,
            exact: true,
            admin: true,
          },
          {
            path: "/mi-perfil/sub-categorias",
            component: AdminSubCategories,
            exact: true,
            admin: true,
          },
          {
            component: Error404,
            admin: false,
          },
        ],
      },
      {
        component: Error404,
      },
    ],
  },
];

export default routes;

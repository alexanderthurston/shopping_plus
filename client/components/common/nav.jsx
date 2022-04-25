import { Button } from './button';

export const NavBar = ({ user, logout, roles, navigate, toggleShopMode, shopMode }) => {
  return (
    <nav className="bg-white border-gray-200 px-2 sm:px-4 py-2.5 rounded dark:bg-gray-800 drop-shadow m-6">
      <div className="container flex flex-wrap justify-between items-center mx-auto">
        <div className="text-3xl">Welcome {user.firstName}</div>
        <div className="hidden w-full md:block md:w-auto" id="mobile-menu">
          <ul className="flex flex-col mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium">
            <li>
              <Button type="button" onClick={logout}>
                Logout
              </Button>
            </li>
            <li>
              {roles.includes('admin') && (
                <Button type="button" onClick={() => navigate('/admin')}>
                  Admin
                </Button>
              )}
            </li>
            <li>
              <Button type="button" onClick={toggleShopMode}>
                {(shopMode ? 'Exit ' : 'Enter ') + 'shopMode'}
              </Button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

import { useCallback } from 'react';
// redux
import { useDispatch, useSelector } from 'react-redux';
import { setThemeMode } from '../store/slices/settings';

const useSettings = () => {
  const { themeMode } = useSelector((state) => state.settings);
  const dispatch = useDispatch();

  const handleToggleTheme = useCallback(
    () => dispatch(setThemeMode(themeMode === 'light' ? 'dark' : 'light')),
    [dispatch, themeMode]
  );

  return {
    themeMode,
    toggleMode: handleToggleTheme
  };
};

export default useSettings;

function useScrollToTop() {
  const scrollToTop = () => {
    document.documentElement.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  };

  return { scrollToTop };
}

export default useScrollToTop;

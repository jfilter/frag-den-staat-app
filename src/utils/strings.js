function breakLongWords(string) {
  // Hotfix, not really helpful fo rnow.
  return string;
  const breakWord = 'gesetz';
  const words = string.split(' ');
  return words
    .map(
      x =>
        x.length > 10 && x.includes(breakWord)
          ? x.replace(breakWord, `- ${breakWord}`)
          : x
    )
    .join(' ');
}

export { breakLongWords };

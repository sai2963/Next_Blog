const HandleFileChange = (e,setFile,setError) => {
    
    const MY_FILE_SIZE = 5 * 1024 * 1024;
    const selectedfile = e.target.files[0];
    if (selectedfile) {
      if (selectedfile.size > MY_FILE_SIZE) {
        setError(
          "The Selected File is Exceeded the Size Limit Select Another File"
        );
        setFile(null);
      } else {
        setFile(selectedfile);
        setError(null);
      }
    }
  };
  export default HandleFileChange;
const mockFilesTree = {
  id: 'root',
  name: 'SDP Data API not available',
  relativefilename: '.',
  type: 'directory',
  children: [
    {
      id: 1,
      name: 'Mock tree folder',
      relativefilename: 'testfile1.txt',
      type: 'file',
      children: [
        {
          id: 2,
          name: 'Mock tree file 1.txt',
          relativefilename: 'testfile1.txt',
          type: 'file'
        },
        {
          id: 3,
          name: 'Mock tree file 2.txt',
          relativefilename: 'testfile2.txt',
          type: 'file'
        }
      ]
    }
  ]
};

export default mockFilesTree;

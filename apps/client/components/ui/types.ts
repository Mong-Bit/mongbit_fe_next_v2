export type WrapMediaqueryProp = {
  width?: string;
  margin?: string;
  flexDirection?: string;
  justifyContent?: string;
  alignitems?: string;
  padding?: string;
  position?: string;
  textAlign?: string;
};

export type Wrap = {
  width?: string;
  height?: string;
  margin?: string;
  overflow?: string;
  display?: string;
  flexWrap?: string;
  position?: string;
  right?: string;
  bottom?: string;
  padding?: string;
  flexDirection?: string;
  justifyContent?: string;
  alignItems?: string;
  backgroundColor?: string;
  borderRadius?: string;
};

export type Image = {
  width?: string;
  margin?: string;
  imageUrl?: string;
  objectFit?: string;
  borderRadius?: string;
  cursor?: string;
};

export type Text = {
  color?: string;
  width?: string;
  padding?: string;
  fontSize?: string;
  whiteSpace?: string;
  overflow?: string;
  textOverflow?: string;
  cursor?: string;
  display?: string;
  marginLeft?: string;
  fontWeight?: string;
  margin?: string;
};

// Test.tsx
export type TestProp = {
  testData: {
    id?: string;
    title?: string;
    imageUrl?: string;
    playCount?: number;
    type?: string;
    likeCount?: number;
    commentCount?: number;
  }[];
};

export type TestVersionSmallForSeveralProp = {
  testData: {
    commentCount?: number;
    id?: string;
    imageUrl?: string;
    likeCount?: number;
    playCount?: number;
    title?: string;
    type?: string;
  }[];
};

export type MyPageTestResultProp = {
  data: {
    // ksh --- 마이페이지 수정 시 업데이트
  }[];
  altString?: string;
};

// TestContent.tsx
export type TitleAndTextProps = {
  text: {
    titleText?: string;
    contentText?: string;
  };
};

export type TitleAndTestProps = {
  style: {
    titleText?: string;
    imageUrl?: string;
    squareText?: string;
  };
};

export type TestVersionBigProp = {
  imageUrl?: string;
  squareText?: string;
};

export type TitleAndTestsSmallForSeveralProp = {
  testData: {
    testCoverDTOList: {
      commentCount?: number;
      id?: string;
      imageUrl?: string;
      likeCount?: number;
      playCount?: number;
      title?: string;
      type?: string;
    }[];
  };
};



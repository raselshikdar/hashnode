export interface Article {
  id: string;
  title: string;
  author: User;
  coverImage: CoverImage;
  content: {
    html: string;
  };
  slug: string;
  readTime: number;
  replyCount: number;
  responseCount: number;
  readTimeInMinutes: number;
  brief: string;
  subtitle: string;
  isFeatured: boolean;
  featured: boolean;
  series: Series;
  publication: Publication;
  bookmarked: boolean;
  views: number;
  url: string;
  totalReactions: number;
  reactionCount: number;
  dateAdded: string;
  featuredAt: string;
  preferences: { disableComments: boolean };
  tags: Tag[];
  likedBy: {
    edges: {
      node: User;
      reactionCount: number;
    }[];
    pageInfo: PageInfo;
    totalDocuments: number;
  };
  likedByMe: {
    edges: {
      reactionCount: number;
    }[];
  };
  comments: {
    edges: {
      node: Comment;
    }[];
    pageInfo: PageInfo;
  };
  seo: {
    title: string;
    description: string;
  };
  features: {
    tableOfContents: {
      isEnabled: boolean;
      items: TableOfContent[];
    };
  };
}

export interface Comment {
  id: string;
  author: User;
  myTotalReactions: number;
  content: {
    text: string;
    html: string;
    markdown: string;
  };
  totalReactions: number;
  dateAdded: string;
  replies?: {
    edges: {
      node: Comment;
    }[];
    pageInfo: PageInfo;
    totalDocuments: number;
  };
}

export interface TableOfContent {
  id: string;
  level: number;
  slug: string;
  title: string;
  parentId: string;
}

export interface Series {
  _id: string;
  slug: string;
  name: string;
}

export interface User {
  _id: string;
  id: string;
  name: string;
  isPro: boolean;
  photo: string;
  username: string;
  following: boolean;
  bio: {
    text: string;
    html: string;
    markdown: string;
  };
  followersCount: number;
  followingsCount: number;
  location: string;
  socialMediaLinks: {
    website: string;
    github: string;
    twitter: string;
    instagram: string;
    facebook: string;
    stackoverflow: string;
    linkedin: string;
    youtube: string;
  };
  dateJoined: string;
  availableFor: string;
  profilePicture: string;
  tagline: string;
  badges: Badge[];
  followers: { nodes: User[]; pageInfo: PageInfo };
  publications: {
    edges: {
      node: {
        id: string;
        url: string;
      }[];
    };
  };
  techStack: {
    nodes: Technology[];
    pageInfo: PageInfo;
    totalDocuments: number;
  };
}

interface Technology {
  id: string;
  name: string;
  slug: string;
  logo: string;
}

export interface Badge {
  id: string;
  name: string;
  image: string;
  dateAssigned: string;
}

export interface CoverImage {
  isPortrait: boolean;
  url: string;
}

export interface Tag {
  _id: string;
  logo: string;
  name: string;
  slug: string;
  followersCount: number;
  postsCount: number;
}

export interface PageInfo {
  hasNextPage: boolean;
  endCursor: string;
  __typename: "PageInfo";
}

export interface Publication {
  _id: string;
  id: string;
  url: string;
  canonicalURL: string;
  title: string;
  domain: string;
  displayTitle: string;
  isHeadless: boolean;
  // favicon: null;
  headerColor: string;
  // metaTags: null;
  isTeam: boolean;
  domainInfo: {
    hashnodeSubdomain: string;
    // domain: null;
  };
  urlPattern: UrlPattern;
}

type UrlPattern = "DEFAULT" | "SIMPLE";
export type FeedType =
  | "RECENT"
  | "PERSONALIZED"
  | "FEATURED"
  | "RELEVANT"
  | "FOLLOWING";

export interface Changelog {
  _id: string;
  title: string;
  slug: string;
  content: string;
  contentMarkdown: string;
  coverImageURL: string;
  author: string;
  type: string;
  isActive: boolean;
  dateAdded: string;
}

export interface Challenge {
  _id: string;
  badges: string[];
  isActive: boolean;
  title: string;
  contentMarkdown: string;
  image: string;
  slug: string;
  descriptionMarkdown: string;
  tagline: string;
  url: string;
  ctaLabel: string;
  ctaURL: string;
  coverImage: string;
  ogImage: string;
  dateAdded: string;
  content: string;
  description: string;
}

export interface UserProfile {
  _id: string;
  numFollowers: number;
  numFollowing: number;
  isAmbassador: boolean;
  hasGoldRing: boolean;
  name: string;
  username: string;
  tagline: string;
  photo: string; // URL string
  blogHandle: string;
  publicationDomain: string | null;
  publicationEnabled: boolean;
  // latestPost: LatestPost;
  // domainStatus: DomainStatus;
}

export type ConnectionType = "following" | "followers";

export type PostCommentSortBy = "TOP" | "RECENT";

export type NewsletterSubscribeStatus = "PENDING" | "CONFIRMED";

export interface Activity {
  dateAdded: string;
  isActive: boolean;
  itemType: string;
  post: { id: string; title: string; slug: string };
  reason: string;
  reply: string;
  response: string;
  responseStamp: string;
  type: string;
  url: string;
  user: string;
  _id: string;
}

// Draft
interface DraftCoverImage {
  url: string;
  attribution: string;
  photographer: string;
  isAttributionHidden: boolean;
}

interface Content {
  markdown: string;
  html: string;
  text: string;
}

interface SEO {
  title: string;
  description: string;
}

interface DraftSettings {
  disableComments: boolean;
  stickCoverToBottom: boolean;
  isDelisted: boolean;
}

type OpenGraphMetaData = { image: string };

interface TableOfContentsItem {
  id: number | string;
  level: number;
  slug: string;
  title: string;
  parentId: number | string;
}

type TableOfContentsFeature = {
  isEnabled: boolean;
  items: TableOfContentsItem[];
};
type DraftFeatures = { tableOfContents: TableOfContentsFeature };

type BackupStatus = "success" | "failed";

interface DraftBackup {
  status: BackupStatus;
  at: string;
}

export interface Draft {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  author: User;
  coAuthors: [User];
  publishAs: User;
  tags: [Tag];
  tagsV2: [Tag];
  canonicalUrl: "xyz789";
  publication: Publication;
  coverImage: DraftCoverImage;
  readTimeInMinutes: 123;
  series: Series;
  content: Content;
  updatedAt: string;
  settings: DraftSettings;
  seo: SEO;
  ogMetaData: OpenGraphMetaData;
  features: DraftFeatures;
  lastBackup: DraftBackup;
  lastSuccessfulBackupAt: string;
  lastFailedBackupAt: string;
  scheduledDate: string;
  isSubmittedForReview: boolean;
}

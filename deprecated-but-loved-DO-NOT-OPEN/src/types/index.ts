type ContentItem = {
  text: string,
  ref?: string
}

type IndividualJourneyItem = {
  sub_heading: string | null;
  content: ContentItem[];
  image: string;
  imageAlt: string;
  imageText: string;
}

type JourneyItem = {
  hasOffset: IndividualJourneyItem
  hasNoOffset: IndividualJourneyItem
};

export type PageInformations = {
  homepageDescription: string,
  aboutpageDescription: {
    myJourney: JourneyItem[]
  }
}
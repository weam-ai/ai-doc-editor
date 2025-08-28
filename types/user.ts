export interface IronSessionData {
    user?: {
      _id: string;
      email: string;
      name?: string;
      companyId?: string;
      access_token?: string;
      refresh_token?: string;
      isProfileUpdated?: boolean;
      roleCode?: string;
      // Add other user properties you need
    };
    companyId?: string;
    // Add other session data you want to store
  }
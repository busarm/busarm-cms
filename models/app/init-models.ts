import type { Sequelize } from "sequelize";
import { AppAgent as _AppAgent } from "./app_agent";
import type { AppAgentAttributes, AppAgentCreationAttributes } from "./app_agent";
import { AppBooking as _AppBooking } from "./app_booking";
import type { AppBookingAttributes, AppBookingCreationAttributes } from "./app_booking";
import { AppBus as _AppBus } from "./app_bus";
import type { AppBusAttributes, AppBusCreationAttributes } from "./app_bus";
import { AppCity as _AppCity } from "./app_city";
import type { AppCityAttributes, AppCityCreationAttributes } from "./app_city";
import { AppConfig as _AppConfig } from "./app_config";
import type { AppConfigAttributes, AppConfigCreationAttributes } from "./app_config";
import { AppCountry as _AppCountry } from "./app_country";
import type { AppCountryAttributes, AppCountryCreationAttributes } from "./app_country";
import { AppDiscount as _AppDiscount } from "./app_discount";
import type { AppDiscountAttributes, AppDiscountCreationAttributes } from "./app_discount";
import { AppEnquiry as _AppEnquiry } from "./app_enquiry";
import type { AppEnquiryAttributes, AppEnquiryCreationAttributes } from "./app_enquiry";
import { AppFeature as _AppFeature } from "./app_feature";
import type { AppFeatureAttributes, AppFeatureCreationAttributes } from "./app_feature";
import { AppLanguage as _AppLanguage } from "./app_language";
import type { AppLanguageAttributes, AppLanguageCreationAttributes } from "./app_language";
import { AppLocation as _AppLocation } from "./app_location";
import type { AppLocationAttributes, AppLocationCreationAttributes } from "./app_location";
import { AppPartner as _AppPartner } from "./app_partner";
import type { AppPartnerAttributes, AppPartnerCreationAttributes } from "./app_partner";
import { AppPaymentMethod as _AppPaymentMethod } from "./app_payment_method";
import type { AppPaymentMethodAttributes, AppPaymentMethodCreationAttributes } from "./app_payment_method";
import { AppPromo as _AppPromo } from "./app_promo";
import type { AppPromoAttributes, AppPromoCreationAttributes } from "./app_promo";
import { AppProvince as _AppProvince } from "./app_province";
import type { AppProvinceAttributes, AppProvinceCreationAttributes } from "./app_province";
import { AppStatus as _AppStatus } from "./app_status";
import type { AppStatusAttributes, AppStatusCreationAttributes } from "./app_status";
import { AppSubscriptionModel as _AppSubscriptionModel } from "./app_subscription_model";
import type { AppSubscriptionModelAttributes, AppSubscriptionModelCreationAttributes } from "./app_subscription_model";
import { AppText as _AppText } from "./app_text";
import type { AppTextAttributes, AppTextCreationAttributes } from "./app_text";
import { AppTicket as _AppTicket } from "./app_ticket";
import type { AppTicketAttributes, AppTicketCreationAttributes } from "./app_ticket";
import { AppTransaction as _AppTransaction } from "./app_transaction";
import type { AppTransactionAttributes, AppTransactionCreationAttributes } from "./app_transaction";
import { AppTrip as _AppTrip } from "./app_trip";
import type { AppTripAttributes, AppTripCreationAttributes } from "./app_trip";
import { AppUser as _AppUser } from "./app_user";
import type { AppUserAttributes, AppUserCreationAttributes } from "./app_user";
import { BankAccount as _BankAccount } from "./bank_account";
import type { BankAccountAttributes, BankAccountCreationAttributes } from "./bank_account";
import { BookingDiscount as _BookingDiscount } from "./booking_discount";
import type { BookingDiscountAttributes, BookingDiscountCreationAttributes } from "./booking_discount";
import { BookingPromo as _BookingPromo } from "./booking_promo";
import type { BookingPromoAttributes, BookingPromoCreationAttributes } from "./booking_promo";
import { BookingTrip as _BookingTrip } from "./booking_trip";
import type { BookingTripAttributes, BookingTripCreationAttributes } from "./booking_trip";
import { BookingTripTicket as _BookingTripTicket } from "./booking_trip_ticket";
import type { BookingTripTicketAttributes, BookingTripTicketCreationAttributes } from "./booking_trip_ticket";
import { BusImage as _BusImage } from "./bus_image";
import type { BusImageAttributes, BusImageCreationAttributes } from "./bus_image";
import { BusType as _BusType } from "./bus_type";
import type { BusTypeAttributes, BusTypeCreationAttributes } from "./bus_type";
import { CountryBankAccount as _CountryBankAccount } from "./country_bank_account";
import type { CountryBankAccountAttributes, CountryBankAccountCreationAttributes } from "./country_bank_account";
import { CountryPaymentMethod as _CountryPaymentMethod } from "./country_payment_method";
import type { CountryPaymentMethodAttributes, CountryPaymentMethodCreationAttributes } from "./country_payment_method";
import { EnquiryType as _EnquiryType } from "./enquiry_type";
import type { EnquiryTypeAttributes, EnquiryTypeCreationAttributes } from "./enquiry_type";
import { LocationType as _LocationType } from "./location_type";
import type { LocationTypeAttributes, LocationTypeCreationAttributes } from "./location_type";
import { Migration as _Migration } from "./migration";
import type { MigrationAttributes, MigrationCreationAttributes } from "./migration";
import { PartnerBankAccount as _PartnerBankAccount } from "./partner_bank_account";
import type { PartnerBankAccountAttributes, PartnerBankAccountCreationAttributes } from "./partner_bank_account";
import { PartnerBranch as _PartnerBranch } from "./partner_branch";
import type { PartnerBranchAttributes, PartnerBranchCreationAttributes } from "./partner_branch";
import { PartnerLocation as _PartnerLocation } from "./partner_location";
import type { PartnerLocationAttributes, PartnerLocationCreationAttributes } from "./partner_location";
import { PartnerSharedBus as _PartnerSharedBus } from "./partner_shared_bus";
import type { PartnerSharedBusAttributes, PartnerSharedBusCreationAttributes } from "./partner_shared_bus";
import { PromoType as _PromoType } from "./promo_type";
import type { PromoTypeAttributes, PromoTypeCreationAttributes } from "./promo_type";
import { StatusType as _StatusType } from "./status_type";
import type { StatusTypeAttributes, StatusTypeCreationAttributes } from "./status_type";
import { TicketType as _TicketType } from "./ticket_type";
import type { TicketTypeAttributes, TicketTypeCreationAttributes } from "./ticket_type";
import { TransactionBooking as _TransactionBooking } from "./transaction_booking";
import type { TransactionBookingAttributes, TransactionBookingCreationAttributes } from "./transaction_booking";
import { TransactionPayin as _TransactionPayin } from "./transaction_payin";
import type { TransactionPayinAttributes, TransactionPayinCreationAttributes } from "./transaction_payin";
import { TransactionPayinRequest as _TransactionPayinRequest } from "./transaction_payin_request";
import type { TransactionPayinRequestAttributes, TransactionPayinRequestCreationAttributes } from "./transaction_payin_request";
import { TransactionPayout as _TransactionPayout } from "./transaction_payout";
import type { TransactionPayoutAttributes, TransactionPayoutCreationAttributes } from "./transaction_payout";
import { TransactionPayoutRequest as _TransactionPayoutRequest } from "./transaction_payout_request";
import type { TransactionPayoutRequestAttributes, TransactionPayoutRequestCreationAttributes } from "./transaction_payout_request";
import { TripBus as _TripBus } from "./trip_bus";
import type { TripBusAttributes, TripBusCreationAttributes } from "./trip_bus";
import { TripDiscount as _TripDiscount } from "./trip_discount";
import type { TripDiscountAttributes, TripDiscountCreationAttributes } from "./trip_discount";
import { TripPromo as _TripPromo } from "./trip_promo";
import type { TripPromoAttributes, TripPromoCreationAttributes } from "./trip_promo";
import { TripSeat as _TripSeat } from "./trip_seat";
import type { TripSeatAttributes, TripSeatCreationAttributes } from "./trip_seat";
import { UserBankAccount as _UserBankAccount } from "./user_bank_account";
import type { UserBankAccountAttributes, UserBankAccountCreationAttributes } from "./user_bank_account";

export {
  _AppAgent as AppAgent,
  _AppBooking as AppBooking,
  _AppBus as AppBus,
  _AppCity as AppCity,
  _AppConfig as AppConfig,
  _AppCountry as AppCountry,
  _AppDiscount as AppDiscount,
  _AppEnquiry as AppEnquiry,
  _AppFeature as AppFeature,
  _AppLanguage as AppLanguage,
  _AppLocation as AppLocation,
  _AppPartner as AppPartner,
  _AppPaymentMethod as AppPaymentMethod,
  _AppPromo as AppPromo,
  _AppProvince as AppProvince,
  _AppStatus as AppStatus,
  _AppSubscriptionModel as AppSubscriptionModel,
  _AppText as AppText,
  _AppTicket as AppTicket,
  _AppTransaction as AppTransaction,
  _AppTrip as AppTrip,
  _AppUser as AppUser,
  _BankAccount as BankAccount,
  _BookingDiscount as BookingDiscount,
  _BookingPromo as BookingPromo,
  _BookingTrip as BookingTrip,
  _BookingTripTicket as BookingTripTicket,
  _BusImage as BusImage,
  _BusType as BusType,
  _CountryBankAccount as CountryBankAccount,
  _CountryPaymentMethod as CountryPaymentMethod,
  _EnquiryType as EnquiryType,
  _LocationType as LocationType,
  _Migration as Migration,
  _PartnerBankAccount as PartnerBankAccount,
  _PartnerBranch as PartnerBranch,
  _PartnerLocation as PartnerLocation,
  _PartnerSharedBus as PartnerSharedBus,
  _PromoType as PromoType,
  _StatusType as StatusType,
  _TicketType as TicketType,
  _TransactionBooking as TransactionBooking,
  _TransactionPayin as TransactionPayin,
  _TransactionPayinRequest as TransactionPayinRequest,
  _TransactionPayout as TransactionPayout,
  _TransactionPayoutRequest as TransactionPayoutRequest,
  _TripBus as TripBus,
  _TripDiscount as TripDiscount,
  _TripPromo as TripPromo,
  _TripSeat as TripSeat,
  _UserBankAccount as UserBankAccount,
};

export type {
  AppAgentAttributes,
  AppAgentCreationAttributes,
  AppBookingAttributes,
  AppBookingCreationAttributes,
  AppBusAttributes,
  AppBusCreationAttributes,
  AppCityAttributes,
  AppCityCreationAttributes,
  AppConfigAttributes,
  AppConfigCreationAttributes,
  AppCountryAttributes,
  AppCountryCreationAttributes,
  AppDiscountAttributes,
  AppDiscountCreationAttributes,
  AppEnquiryAttributes,
  AppEnquiryCreationAttributes,
  AppFeatureAttributes,
  AppFeatureCreationAttributes,
  AppLanguageAttributes,
  AppLanguageCreationAttributes,
  AppLocationAttributes,
  AppLocationCreationAttributes,
  AppPartnerAttributes,
  AppPartnerCreationAttributes,
  AppPaymentMethodAttributes,
  AppPaymentMethodCreationAttributes,
  AppPromoAttributes,
  AppPromoCreationAttributes,
  AppProvinceAttributes,
  AppProvinceCreationAttributes,
  AppStatusAttributes,
  AppStatusCreationAttributes,
  AppSubscriptionModelAttributes,
  AppSubscriptionModelCreationAttributes,
  AppTextAttributes,
  AppTextCreationAttributes,
  AppTicketAttributes,
  AppTicketCreationAttributes,
  AppTransactionAttributes,
  AppTransactionCreationAttributes,
  AppTripAttributes,
  AppTripCreationAttributes,
  AppUserAttributes,
  AppUserCreationAttributes,
  BankAccountAttributes,
  BankAccountCreationAttributes,
  BookingDiscountAttributes,
  BookingDiscountCreationAttributes,
  BookingPromoAttributes,
  BookingPromoCreationAttributes,
  BookingTripAttributes,
  BookingTripCreationAttributes,
  BookingTripTicketAttributes,
  BookingTripTicketCreationAttributes,
  BusImageAttributes,
  BusImageCreationAttributes,
  BusTypeAttributes,
  BusTypeCreationAttributes,
  CountryBankAccountAttributes,
  CountryBankAccountCreationAttributes,
  CountryPaymentMethodAttributes,
  CountryPaymentMethodCreationAttributes,
  EnquiryTypeAttributes,
  EnquiryTypeCreationAttributes,
  LocationTypeAttributes,
  LocationTypeCreationAttributes,
  MigrationAttributes,
  MigrationCreationAttributes,
  PartnerBankAccountAttributes,
  PartnerBankAccountCreationAttributes,
  PartnerBranchAttributes,
  PartnerBranchCreationAttributes,
  PartnerLocationAttributes,
  PartnerLocationCreationAttributes,
  PartnerSharedBusAttributes,
  PartnerSharedBusCreationAttributes,
  PromoTypeAttributes,
  PromoTypeCreationAttributes,
  StatusTypeAttributes,
  StatusTypeCreationAttributes,
  TicketTypeAttributes,
  TicketTypeCreationAttributes,
  TransactionBookingAttributes,
  TransactionBookingCreationAttributes,
  TransactionPayinAttributes,
  TransactionPayinCreationAttributes,
  TransactionPayinRequestAttributes,
  TransactionPayinRequestCreationAttributes,
  TransactionPayoutAttributes,
  TransactionPayoutCreationAttributes,
  TransactionPayoutRequestAttributes,
  TransactionPayoutRequestCreationAttributes,
  TripBusAttributes,
  TripBusCreationAttributes,
  TripDiscountAttributes,
  TripDiscountCreationAttributes,
  TripPromoAttributes,
  TripPromoCreationAttributes,
  TripSeatAttributes,
  TripSeatCreationAttributes,
  UserBankAccountAttributes,
  UserBankAccountCreationAttributes,
};

export function initModels(sequelize: Sequelize) {
  const AppAgent = _AppAgent.initModel(sequelize);
  const AppBooking = _AppBooking.initModel(sequelize);
  const AppBus = _AppBus.initModel(sequelize);
  const AppCity = _AppCity.initModel(sequelize);
  const AppConfig = _AppConfig.initModel(sequelize);
  const AppCountry = _AppCountry.initModel(sequelize);
  const AppDiscount = _AppDiscount.initModel(sequelize);
  const AppEnquiry = _AppEnquiry.initModel(sequelize);
  const AppFeature = _AppFeature.initModel(sequelize);
  const AppLanguage = _AppLanguage.initModel(sequelize);
  const AppLocation = _AppLocation.initModel(sequelize);
  const AppPartner = _AppPartner.initModel(sequelize);
  const AppPaymentMethod = _AppPaymentMethod.initModel(sequelize);
  const AppPromo = _AppPromo.initModel(sequelize);
  const AppProvince = _AppProvince.initModel(sequelize);
  const AppStatus = _AppStatus.initModel(sequelize);
  const AppSubscriptionModel = _AppSubscriptionModel.initModel(sequelize);
  const AppText = _AppText.initModel(sequelize);
  const AppTicket = _AppTicket.initModel(sequelize);
  const AppTransaction = _AppTransaction.initModel(sequelize);
  const AppTrip = _AppTrip.initModel(sequelize);
  const AppUser = _AppUser.initModel(sequelize);
  const BankAccount = _BankAccount.initModel(sequelize);
  const BookingDiscount = _BookingDiscount.initModel(sequelize);
  const BookingPromo = _BookingPromo.initModel(sequelize);
  const BookingTrip = _BookingTrip.initModel(sequelize);
  const BookingTripTicket = _BookingTripTicket.initModel(sequelize);
  const BusImage = _BusImage.initModel(sequelize);
  const BusType = _BusType.initModel(sequelize);
  const CountryBankAccount = _CountryBankAccount.initModel(sequelize);
  const CountryPaymentMethod = _CountryPaymentMethod.initModel(sequelize);
  const EnquiryType = _EnquiryType.initModel(sequelize);
  const LocationType = _LocationType.initModel(sequelize);
  const Migration = _Migration.initModel(sequelize);
  const PartnerBankAccount = _PartnerBankAccount.initModel(sequelize);
  const PartnerBranch = _PartnerBranch.initModel(sequelize);
  const PartnerLocation = _PartnerLocation.initModel(sequelize);
  const PartnerSharedBus = _PartnerSharedBus.initModel(sequelize);
  const PromoType = _PromoType.initModel(sequelize);
  const StatusType = _StatusType.initModel(sequelize);
  const TicketType = _TicketType.initModel(sequelize);
  const TransactionBooking = _TransactionBooking.initModel(sequelize);
  const TransactionPayin = _TransactionPayin.initModel(sequelize);
  const TransactionPayinRequest = _TransactionPayinRequest.initModel(sequelize);
  const TransactionPayout = _TransactionPayout.initModel(sequelize);
  const TransactionPayoutRequest = _TransactionPayoutRequest.initModel(sequelize);
  const TripBus = _TripBus.initModel(sequelize);
  const TripDiscount = _TripDiscount.initModel(sequelize);
  const TripPromo = _TripPromo.initModel(sequelize);
  const TripSeat = _TripSeat.initModel(sequelize);
  const UserBankAccount = _UserBankAccount.initModel(sequelize);

  AppTrip.belongsTo(AppAgent, { foreignKey: "agentId"});
  AppAgent.hasMany(AppTrip, { foreignKey: "agentId"});
  BookingDiscount.belongsTo(AppBooking, { foreignKey: "bookingId"});
  AppBooking.hasOne(BookingDiscount, { foreignKey: "bookingId"});
  BookingPromo.belongsTo(AppBooking, { foreignKey: "bookingId"});
  AppBooking.hasOne(BookingPromo, { foreignKey: "bookingId"});
  BookingTrip.belongsTo(AppBooking, { foreignKey: "bookingId"});
  AppBooking.hasOne(BookingTrip, { foreignKey: "bookingId"});
  BookingTripTicket.belongsTo(AppBooking, { foreignKey: "bookingId"});
  AppBooking.hasMany(BookingTripTicket, { foreignKey: "bookingId"});
  TransactionBooking.belongsTo(AppBooking, { foreignKey: "bookingId"});
  AppBooking.hasOne(TransactionBooking, { foreignKey: "bookingId"});
  TripSeat.belongsTo(AppBooking, { foreignKey: "bookingId"});
  AppBooking.hasMany(TripSeat, { foreignKey: "bookingId"});
  BusImage.belongsTo(AppBus, { foreignKey: "busId"});
  AppBus.hasMany(BusImage, { foreignKey: "busId"});
  PartnerSharedBus.belongsTo(AppBus, { foreignKey: "busId"});
  AppBus.hasMany(PartnerSharedBus, { foreignKey: "busId"});
  TripBus.belongsTo(AppBus, { foreignKey: "partnerId"});
  AppBus.hasMany(TripBus, { foreignKey: "partnerId"});
  TripBus.belongsTo(AppBus, { foreignKey: "busId"});
  AppBus.hasMany(TripBus, { foreignKey: "busId"});
  AppLocation.belongsTo(AppCity, { foreignKey: "cityId"});
  AppCity.hasMany(AppLocation, { foreignKey: "cityId"});
  AppBooking.belongsTo(AppCountry, { foreignKey: "currencyCode"});
  AppCountry.hasMany(AppBooking, { foreignKey: "currencyCode"});
  AppBus.belongsTo(AppCountry, { foreignKey: "countryCode"});
  AppCountry.hasMany(AppBus, { foreignKey: "countryCode"});
  AppProvince.belongsTo(AppCountry, { foreignKey: "countryCode"});
  AppCountry.hasMany(AppProvince, { foreignKey: "countryCode"});
  AppTicket.belongsTo(AppCountry, { foreignKey: "currencyCode"});
  AppCountry.hasMany(AppTicket, { foreignKey: "currencyCode"});
  AppTransaction.belongsTo(AppCountry, { foreignKey: "currencyCode"});
  AppCountry.hasMany(AppTransaction, { foreignKey: "currencyCode"});
  AppUser.belongsTo(AppCountry, { foreignKey: "userDialCode"});
  AppCountry.hasMany(AppUser, { foreignKey: "userDialCode"});
  CountryBankAccount.belongsTo(AppCountry, { foreignKey: "countryCode"});
  AppCountry.hasMany(CountryBankAccount, { foreignKey: "countryCode"});
  CountryPaymentMethod.belongsTo(AppCountry, { foreignKey: "countryCode"});
  AppCountry.hasMany(CountryPaymentMethod, { foreignKey: "countryCode"});
  TransactionPayinRequest.belongsTo(AppCountry, { foreignKey: "currencyCode"});
  AppCountry.hasMany(TransactionPayinRequest, { foreignKey: "currencyCode"});
  TransactionPayoutRequest.belongsTo(AppCountry, { foreignKey: "currencyCode"});
  AppCountry.hasMany(TransactionPayoutRequest, { foreignKey: "currencyCode"});
  BookingDiscount.belongsTo(AppDiscount, { foreignKey: "discountCode"});
  AppDiscount.hasMany(BookingDiscount, { foreignKey: "discountCode"});
  TripDiscount.belongsTo(AppDiscount, { foreignKey: "discountCode"});
  AppDiscount.hasMany(TripDiscount, { foreignKey: "discountCode"});
  AppText.belongsTo(AppLanguage, { foreignKey: "langCode"});
  AppLanguage.hasMany(AppText, { foreignKey: "langCode"});
  AppUser.belongsTo(AppLanguage, { foreignKey: "userLangCode"});
  AppLanguage.hasMany(AppUser, { foreignKey: "userLangCode"});
  AppTrip.belongsTo(AppLocation, { foreignKey: "dropoffLocId"});
  AppLocation.hasMany(AppTrip, { foreignKey: "dropoffLocId"});
  AppTrip.belongsTo(AppLocation, { foreignKey: "pickupLocId"});
  AppLocation.hasMany(AppTrip, { foreignKey: "pickupLocId"});
  PartnerBranch.belongsTo(AppLocation, { foreignKey: "locId"});
  AppLocation.hasMany(PartnerBranch, { foreignKey: "locId"});
  PartnerLocation.belongsTo(AppLocation, { foreignKey: "locId"});
  AppLocation.hasMany(PartnerLocation, { foreignKey: "locId"});
  AppAgent.belongsTo(AppPartner, { foreignKey: "partnerId"});
  AppPartner.hasMany(AppAgent, { foreignKey: "partnerId"});
  AppBus.belongsTo(AppPartner, { foreignKey: "partnerId"});
  AppPartner.hasMany(AppBus, { foreignKey: "partnerId"});
  PartnerBankAccount.belongsTo(AppPartner, { foreignKey: "partnerId"});
  AppPartner.hasOne(PartnerBankAccount, { foreignKey: "partnerId"});
  PartnerBranch.belongsTo(AppPartner, { foreignKey: "partnerId"});
  AppPartner.hasMany(PartnerBranch, { foreignKey: "partnerId"});
  PartnerLocation.belongsTo(AppPartner, { foreignKey: "partnerId"});
  AppPartner.hasMany(PartnerLocation, { foreignKey: "partnerId"});
  PartnerSharedBus.belongsTo(AppPartner, { foreignKey: "partnerId"});
  AppPartner.hasMany(PartnerSharedBus, { foreignKey: "partnerId"});
  AppTransaction.belongsTo(AppPaymentMethod, { foreignKey: "transactionMethod"});
  AppPaymentMethod.hasMany(AppTransaction, { foreignKey: "transactionMethod"});
  CountryPaymentMethod.belongsTo(AppPaymentMethod, { foreignKey: "methodId"});
  AppPaymentMethod.hasMany(CountryPaymentMethod, { foreignKey: "methodId"});
  BookingPromo.belongsTo(AppPromo, { foreignKey: "promoCode"});
  AppPromo.hasMany(BookingPromo, { foreignKey: "promoCode"});
  TripPromo.belongsTo(AppPromo, { foreignKey: "promoCode"});
  AppPromo.hasMany(TripPromo, { foreignKey: "promoCode"});
  AppCity.belongsTo(AppProvince, { foreignKey: "provCode"});
  AppProvince.hasMany(AppCity, { foreignKey: "provCode"});
  AppBooking.belongsTo(AppStatus, { foreignKey: "statusId"});
  AppStatus.hasMany(AppBooking, { foreignKey: "statusId"});
  AppTransaction.belongsTo(AppStatus, { foreignKey: "statusId"});
  AppStatus.hasMany(AppTransaction, { foreignKey: "statusId"});
  AppTrip.belongsTo(AppStatus, { foreignKey: "statusId"});
  AppStatus.hasMany(AppTrip, { foreignKey: "statusId"});
  AppBus.belongsTo(AppText, { foreignKey: "busDescTextId"});
  AppText.hasMany(AppBus, { foreignKey: "busDescTextId"});
  AppDiscount.belongsTo(AppText, { foreignKey: "discountDescTextId"});
  AppText.hasMany(AppDiscount, { foreignKey: "discountDescTextId"});
  AppPromo.belongsTo(AppText, { foreignKey: "promoDescTextId"});
  AppText.hasMany(AppPromo, { foreignKey: "promoDescTextId"});
  TicketType.belongsTo(AppText, { foreignKey: "textId"});
  AppText.hasMany(TicketType, { foreignKey: "textId"});
  AppTrip.belongsTo(AppTicket, { foreignKey: "ticketId"});
  AppTicket.hasMany(AppTrip, { foreignKey: "ticketId"});
  BookingTripTicket.belongsTo(AppTicket, { foreignKey: "ticketTypeId"});
  AppTicket.hasMany(BookingTripTicket, { foreignKey: "ticketTypeId"});
  TransactionBooking.belongsTo(AppTransaction, { foreignKey: "transactionId"});
  AppTransaction.hasOne(TransactionBooking, { foreignKey: "transactionId"});
  TransactionPayin.belongsTo(AppTransaction, { foreignKey: "transactionId"});
  AppTransaction.hasOne(TransactionPayin, { foreignKey: "transactionId"});
  TransactionPayout.belongsTo(AppTransaction, { foreignKey: "transactionId"});
  AppTransaction.hasOne(TransactionPayout, { foreignKey: "transactionId"});
  BookingTrip.belongsTo(AppTrip, { foreignKey: "tripId"});
  AppTrip.hasMany(BookingTrip, { foreignKey: "tripId"});
  TripBus.belongsTo(AppTrip, { foreignKey: "tripId"});
  AppTrip.hasOne(TripBus, { foreignKey: "tripId"});
  TripBus.belongsTo(AppTrip, { foreignKey: "agentId"});
  AppTrip.hasMany(TripBus, { foreignKey: "agentId"});
  TripBus.belongsTo(AppTrip, { foreignKey: "busTypeId"});
  AppTrip.hasMany(TripBus, { foreignKey: "busTypeId"});
  TripSeat.belongsTo(AppTrip, { foreignKey: "tripId"});
  AppTrip.hasMany(TripSeat, { foreignKey: "tripId"});
  AppAgent.belongsTo(AppUser, { foreignKey: "userId"});
  AppUser.hasOne(AppAgent, { foreignKey: "userId"});
  AppBooking.belongsTo(AppUser, { foreignKey: "userId"});
  AppUser.hasMany(AppBooking, { foreignKey: "userId"});
  AppPartner.belongsTo(AppUser, { foreignKey: "userId"});
  AppUser.hasOne(AppPartner, { foreignKey: "userId"});
  AppTransaction.belongsTo(AppUser, { foreignKey: "creatorId"});
  AppUser.hasMany(AppTransaction, { foreignKey: "creatorId"});
  TransactionPayinRequest.belongsTo(AppUser, { foreignKey: "userId"});
  AppUser.hasMany(TransactionPayinRequest, { foreignKey: "userId"});
  TransactionPayoutRequest.belongsTo(AppUser, { foreignKey: "userId"});
  AppUser.hasMany(TransactionPayoutRequest, { foreignKey: "userId"});
  UserBankAccount.belongsTo(AppUser, { foreignKey: "userId"});
  AppUser.hasOne(UserBankAccount, { foreignKey: "userId"});
  CountryBankAccount.belongsTo(BankAccount, { foreignKey: "accountId"});
  BankAccount.hasMany(CountryBankAccount, { foreignKey: "accountId"});
  PartnerBankAccount.belongsTo(BankAccount, { foreignKey: "accountId"});
  BankAccount.hasMany(PartnerBankAccount, { foreignKey: "accountId"});
  UserBankAccount.belongsTo(BankAccount, { foreignKey: "accountId"});
  BankAccount.hasMany(UserBankAccount, { foreignKey: "accountId"});
  AppBus.belongsTo(BusType, { foreignKey: "typeId"});
  BusType.hasMany(AppBus, { foreignKey: "typeId"});
  AppTrip.belongsTo(BusType, { foreignKey: "busTypeId"});
  BusType.hasMany(AppTrip, { foreignKey: "busTypeId"});
  AppEnquiry.belongsTo(EnquiryType, { foreignKey: "typeId"});
  EnquiryType.hasMany(AppEnquiry, { foreignKey: "typeId"});
  AppLocation.belongsTo(LocationType, { foreignKey: "typeId"});
  LocationType.hasMany(AppLocation, { foreignKey: "typeId"});
  AppAgent.belongsTo(PartnerBranch, { foreignKey: "branchId"});
  PartnerBranch.hasMany(AppAgent, { foreignKey: "branchId"});
  AppPromo.belongsTo(PromoType, { foreignKey: "promoTypeId"});
  PromoType.hasMany(AppPromo, { foreignKey: "promoTypeId"});
  AppStatus.belongsTo(StatusType, { foreignKey: "typeId"});
  StatusType.hasMany(AppStatus, { foreignKey: "typeId"});
  AppTicket.belongsTo(TicketType, { foreignKey: "ticketTypeId"});
  TicketType.hasMany(AppTicket, { foreignKey: "ticketTypeId"});
  TransactionPayin.belongsTo(TransactionPayinRequest, { foreignKey: "requestId"});
  TransactionPayinRequest.hasOne(TransactionPayin, { foreignKey: "requestId"});
  TransactionPayout.belongsTo(TransactionPayoutRequest, { foreignKey: "requestId"});
  TransactionPayoutRequest.hasOne(TransactionPayout, { foreignKey: "requestId"});

  return {
    AppAgent: AppAgent,
    AppBooking: AppBooking,
    AppBus: AppBus,
    AppCity: AppCity,
    AppConfig: AppConfig,
    AppCountry: AppCountry,
    AppDiscount: AppDiscount,
    AppEnquiry: AppEnquiry,
    AppFeature: AppFeature,
    AppLanguage: AppLanguage,
    AppLocation: AppLocation,
    AppPartner: AppPartner,
    AppPaymentMethod: AppPaymentMethod,
    AppPromo: AppPromo,
    AppProvince: AppProvince,
    AppStatus: AppStatus,
    AppSubscriptionModel: AppSubscriptionModel,
    AppText: AppText,
    AppTicket: AppTicket,
    AppTransaction: AppTransaction,
    AppTrip: AppTrip,
    AppUser: AppUser,
    BankAccount: BankAccount,
    BookingDiscount: BookingDiscount,
    BookingPromo: BookingPromo,
    BookingTrip: BookingTrip,
    BookingTripTicket: BookingTripTicket,
    BusImage: BusImage,
    BusType: BusType,
    CountryBankAccount: CountryBankAccount,
    CountryPaymentMethod: CountryPaymentMethod,
    EnquiryType: EnquiryType,
    LocationType: LocationType,
    Migration: Migration,
    PartnerBankAccount: PartnerBankAccount,
    PartnerBranch: PartnerBranch,
    PartnerLocation: PartnerLocation,
    PartnerSharedBus: PartnerSharedBus,
    PromoType: PromoType,
    StatusType: StatusType,
    TicketType: TicketType,
    TransactionBooking: TransactionBooking,
    TransactionPayin: TransactionPayin,
    TransactionPayinRequest: TransactionPayinRequest,
    TransactionPayout: TransactionPayout,
    TransactionPayoutRequest: TransactionPayoutRequest,
    TripBus: TripBus,
    TripDiscount: TripDiscount,
    TripPromo: TripPromo,
    TripSeat: TripSeat,
    UserBankAccount: UserBankAccount,
  };
}

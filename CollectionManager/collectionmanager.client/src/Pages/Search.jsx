import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Checkbox, Form, Input, Select, Space } from "antd";
import axios_instance from "../utils/apiconfig";
import axios from "axios";
import queryBuilder from "../utils/query_builder";

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const Search = () => {
  const [response, setResponse] = useState("");
  const [size, setSize] = useState("");

  const [form] = Form.useForm();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      // You can await here
      const response = await axios.get("api/home");
      // ...
      console.log(response);
    }
    fetchData();
  }, []);

  const onReset = () => {
    form.resetFields();
  };

  const onFinish = async (values) => {
    console.log("Success:", values);

    //form.setFieldsValue({ note: 'Hi, man!' });

    const searchQuery = queryBuilder(values);

    try {
      // const res = await axios.post(
      //   "/api/home",
      //   {
      //     // id: 0,
      //     name: "Test",
      //     team: "Tottenham",
      //     leage: "Premier",
      //     isFlocked: true,
      //     jerseyName: "Jotinho",
      //     jerseyNumber: 69,
      //   },
      //   { headers: { "Content-Type": "application/json" } }
      // );

      console.log(searchQuery);

      const cookies = [
        "access_token_web=eyJraWQiOiJFNTdZZHJ1SHBsQWp1MmNObzFEb3JIM2oyN0J1NS1zX09QNVB3UGlobjVNIiwiYWxnIjoiUFMyNTYifQ.eyJhY2NvdW50X2lkIjo2MjA5MjI4MywiYXBwX2lkIjo0LCJhdWQiOiJmci5jb3JlLmFwaSIsImNsaWVudF9pZCI6IndlYiIsImV4cCI6MTc2MDM3MDc3NSwiaWF0IjoxNzYwMzYzNTc1LCJpc3MiOiJ2aW50ZWQtaWFtLXNlcnZpY2UiLCJsb2dpbl90eXBlIjozLCJwdXJwb3NlIjoiYWNjZXNzIiwic2NvcGUiOiJ1c2VyIiwic2lkIjoiMWNmMDJkOGItMTc0NzA1NzQyOCIsInN1YiI6Ijg2MjAzNDI3IiwiY2MiOiJERSIsImFuaWQiOiJiYTBjYzg0OC03MDVhLTRlNzMtOThlYi1mMDMwMzRjYTM4MDEiLCJhY3QiOnsic3ViIjoiODYyMDM0MjcifX0.dxQ6czqhSTpRa0ZVfhcoiNScjuI6oe2Ip7zzWC6l6sHt0UrC7MbyeuUDQxbCPh6fMBRQCSUKOKE2MzXyPHNKkJOIXGLwj2_ItR_ESzE6wGXWqc4ey-IMpAFAPKDk7cC4oMjoc-6dxJx_p9YumNBqmlYI1UwEKeR_6XS-pfXlsaKayDimJEj6cwDbd_B72UahxT8NyycTNTZgaAuUIGzXS7VIbbtCEsv5dNwf0BsrrV6ypRhf8qP_beEDjF0Jm9Z7DDq_OVHL9gpjclJCNygKMmcHEafbPvEib8ELouEdP0-AIq4MsOWH4Etko3X6FKGi04SRn217oQexctWiYXU73Q",
        "_vinted_fr_session=UDhLaE1NWXpXakhFVFFxbStDYU5GbGYvai8rUlhMcnoxZE42bG5TRTIxVklHVW9ucktNSWl5djVjOTlHRmprZjVxVzU4STBuR216NjVJa2N4SGRuZUw2MHpvV1JwaFgwaURDcXUvSEJVWmRYZi9ZcDZNNVljZW4ybUxqaEo3dUJEcmtQZ0hiRHlkdWVIU3Rad2lSNmRWZnJrVzEzbFdCaTUwckhSNUZSREJHb2k5TkkvbytORXRmZkc1NUNSOEoyc2ZLN1p0Q1UvaHJvamtJSlZQSVJNWW1vMEVTY1N0bXVGVi9kakhWKzVjeXFRSHhjZXp2NUZwWDgzaUQ5eGtNVmNJelRwRVNXV0s0YkM4c3ROcnJkSkcwc1JobGtpN1J5MkdFcUhrb0EwMTF2Y2NsOXgrVmQyNWxaMkRzZDMyc3pNcWM3ZzNtTjBtdWIwK0l2NGhlTjIvZnhTWHhoZXRUVXI2WkpSUU9HM24yR2tyRkRnL0xTVzZLYzZOd3hJV2xHNGUxM0tYYVFabE02eGJmSFBYN1FhRjJyYWt4KzBaZktlNWhMYlZjUlRCK3diN2haT205M2IrcjZjU1JzM0VNb2QzTEhMMkl0NE1JWmViMDRDckxxVFk5T2NjYXhtSGhUa3NETFJjcmc2bHJjcmdNWVlQc1NLUVMrV0tITVc3RjRWSnVDNjJRTEZ2SWVPRDNYU0dSbUtMK2FjZmlTdngxMlhqYXVnU0t2ZXZETG5yZUFUU3NJMUMvU1oxblBpQStrWktuMXBXSkp4VHIwVGVTMDdYUkk1R0J2bGtPTHllOW9oOUVwcTgwRTM0Um04Ukp4eVRVSVgrRHhCTW03aEVoaGdOOW91MTljZkk1SzdEL1h4eDEyUXFSUVRyYjhLQ2tZUnRGUGwvelY5STFVS254Vkt4WE1uLzhkdlpsbS9qZmhCZzRVNUFHT2xYKzQrSk8zN1dlWlI5eVFoZkplMis5VktndzRvRVdsYWdPalFrcEtjSjcwMGFuNGc3SVU5enB3LS1yQS9xbEFvYUh2dTB5cVBPWWswdDZRPT0%3D--042a766642ca06e2470dda3617a88065fe8b3438",
        "datadome=Aa9kudjx80gOczP_DkzcDrCWphHnQr1ouxEk~RsSRSPJJcxMChvANY6STvajp3jEG1OqQN9TMr6OI63mRoGU5rOFTLKtUyjjZSzyuR153aggS9KyHDnMCWZhtAC5O2Lv",
      ].join("; ");

      const cookie =
        "v_udt=R1N0b2c5ZzNIR0JYZ3QwUXJMS09wR1kyTCtrcC0tK2ppMXduZk9oL21UMFcydC0teCtLbEo4Tyt6QjFQM0grWWh1VXRzUT09; domain_selected=true; _ga=GA1.1.4485054.1727275518; _tt_enable_cookie=1; anon_id=ba0cc848-705a-4e73-98eb-f03034ca3801; pbjs-id5id_cst=zix7LPQsHA%3D%3D; RoktRecogniser=2245612e-55b7-4196-bb27-29b831aad2fb; sharedid=efdf3f4a-5ff8-49bf-9144-76e570d6788d; sharedid_cst=zix7LPQsHA%3D%3D; uuid=D483D351-42D4-4EA7-B58B-2AFD8D3C8B1B; _ttp=9_c5c1MdFk1GIj_foBfdIZllxIO.tt.1; seller_header_visits=6; anonymous-locale=de-fr; pbjs-id5id=%7B%22created_at%22%3A%222025-01-24T15%3A02%3A46.362778588Z%22%2C%22id5_consent%22%3Afalse%2C%22original_uid%22%3A%220%22%2C%22universal_uid%22%3A%220%22%2C%22link_type%22%3A0%2C%22cascade_needed%22%3Afalse%2C%22privacy%22%3A%7B%22jurisdiction%22%3A%22gdpr%22%2C%22id5_consent%22%3Afalse%7D%2C%22ext%22%3A%7B%22linkType%22%3A0%2C%22pba%22%3A%22VB%2Bc%2Fwpb67i528%2FYaZjNWQ%3D%3D%22%7D%2C%22ids%22%3A%7B%22id5id%22%3A%7B%22eid%22%3A%7B%22source%22%3A%22id5-sync.com%22%2C%22uids%22%3A%5B%7B%22id%22%3A%220%22%2C%22atype%22%3A1%2C%22ext%22%3A%7B%22linkType%22%3A0%2C%22pba%22%3A%22VB%2Bc%2Fwpb67i528%2FYaZjNWQ%3D%3D%22%7D%7D%5D%7D%7D%7D%7D; pbjs-id5id_last=Fri%2C%2024%20Jan%202025%2015%3A02%3A44%20GMT; cto_bundle=mZuCql81NDNIVEolMkZtNlZyUzZJeDI2UVBJMnI5JTJGR2t3dGhQQiUyQlBtM1kxMXB3dHNKdkZKJTJGTkVWclowMSUyRlIwMG1UUyUyQlc5cUJQTXg5dFZjMWFERkl0TUtvYyUyRlRjRVJWYXpUYkxTWndSbG9xM2V0R2FPekp3RUlvMFVMQXpVUFhuNmlTJTJGN0dWZEZSMTlncHNEViUyRm1jTGNHMU9MZ3clM0QlM0Q; _uetvid=c8b455507b4c11efbf2cbf8e004bb0b1; __podscribe_vinted_referrer=_; __podscribe_vinted_landing_url=https://www.vinted.de/session-refresh?ref_url=%2Fcatalog%3Fsearch_text%3DChelsea%26size_ids%255B%255D%3D208%26search_id%3D8119707379%26order%3Dnewest_first; __podscribe_did=pscrb_5a82ebf5-2191-4510-d2e3-38bc801d34da; __gads=ID=1c2fc14b1345f4aa:T=1727275596:RT=1744712948:S=ALNI_MYtKmM6485Yo2JQf5O5s77U1A4QWw; __gpi=UID=00000efcc7301358:T=1727275596:RT=1744712948:S=ALNI_MZLou1rmSLX_a_gn85K5vzyzicEcw; v_uid=86203427; v_sid=1cf02d8b-1747057428; anon_id=ba0cc848-705a-4e73-98eb-f03034ca3801; _cc_id=da42c88dbaf8bd2d320f79ff2e0d72fd; __pscrb_vinted_first_visited_at=1752523064725; OptanonAlertBoxClosed=2025-07-24T13:24:51.479Z; eupubconsent-v2=CQVDZHAQVDZHAAcABBDEB0FsAP_gAEPgAChQLNtR_G__bWlr-T73afpkeYxP99hr7sQxBgbJk24FzLvW_JwSx2E5NAzatqIKmRIAu3TBIQNlHJDURVCgKogVryDMaEyUoTNKJ6BkiBMRI2JYCFxvm4tjeQCY5vr991c1mB-N7dr83dzyy4hHn3a5_2S1WJCdIYetDfv8ZBKT-9IEd_x8v4v4_F7pE2-eS1n_pGvp6D9-YlM_dB299_baffzPn_frk_e_X_vf_n37v843H77v_4LMgAmGhUQRlkQAhEoGAECABQVhABQIAgAASBogIATBgU5AwAXWEyAEAKAAYIAQAAgwABAAAJAAhEAFABAIAAIBAoAAwAIAgIAGBgADABYCAQAAgOgYpgQQCBYAJGZFBpgSgAJBAS2VCCQBAgrhCEWeAQQIiYKAAAEAAoCAAB4LAQkkBKxIIAuIJoAACAAAKIECBFI2YAgoDNFoLwZPoyNMAwfMEySmQZAEwRkZJsQm_CYeOQogAAAA.f_wACHwAAAAA; OTAdditionalConsentString=1~43.46.55.61.70.83.89.93.108.117.122.124.135.143.144.147.149.159.192.196.211.228.230.239.259.266.286.291.311.318.320.322.323.327.367.371.385.394.407.415.424.430.436.445.486.491.494.495.522.523.540.550.559.560.568.574.576.584.587.591.737.802.803.820.839.864.899.904.922.931.938.959.979.981.985.1003.1027.1031.1040.1046.1051.1053.1067.1092.1095.1097.1099.1107.1109.1135.1143.1149.1152.1162.1166.1186.1188.1205.1215.1226.1227.1230.1252.1268.1270.1276.1284.1290.1301.1307.1312.1329.1345.1356.1375.1403.1415.1416.1421.1423.1440.1449.1455.1495.1512.1516.1525.1540.1548.1555.1558.1570.1577.1579.1583.1584.1603.1616.1638.1651.1653.1659.1667.1677.1678.1682.1697.1699.1703.1712.1716.1721.1725.1732.1745.1750.1765.1782.1786.1800.1810.1825.1827.1832.1838.1840.1842.1843.1845.1859.1866.1870.1878.1880.1889.1917.1929.1942.1944.1962.1963.1964.1967.1968.1969.1978.1985.1987.2003.2008.2027.2035.2039.2047.2052.2056.2064.2068.2072.2074.2088.2090.2103.2107.2109.2115.2124.2130.2133.2135.2137.2140.2147.2156.2166.2177.2186.2205.2213.2216.2219.2220.2222.2225.2234.2253.2275.2279.2282.2292.2309.2312.2316.2322.2325.2328.2331.2335.2336.2343.2354.2358.2359.2370.2376.2377.2387.2400.2403.2405.2407.2411.2414.2416.2418.2425.2440.2447.2461.2465.2468.2472.2477.2481.2484.2486.2488.2493.2498.2501.2510.2517.2526.2527.2532.2535.2542.2552.2563.2564.2567.2568.2569.2571.2572.2575.2577.2583.2584.2596.2604.2605.2608.2609.2610.2612.2614.2621.2627.2628.2629.2633.2636.2642.2643.2645.2646.2650.2651.2652.2656.2657.2658.2660.2661.2669.2670.2677.2681.2684.2687.2690.2695.2698.2713.2714.2729.2739.2767.2768.2770.2772.2784.2787.2791.2792.2798.2801.2805.2812.2813.2816.2817.2821.2822.2827.2830.2831.2833.2834.2838.2839.2844.2846.2849.2850.2852.2854.2860.2862.2863.2865.2867.2869.2873.2874.2875.2876.2878.2880.2881.2882.2883.2884.2886.2887.2888.2889.2891.2893.2894.2895.2897.2898.2900.2901.2908.2909.2916.2917.2918.2919.2920.2922.2923.2927.2929.2930.2931.2940.2941.2947.2949.2950.2956.2958.2961.2963.2964.2965.2966.2968.2973.2975.2979.2980.2981.2983.2985.2986.2987.2994.2995.2997.2999.3000.3002.3003.3005.3008.3009.3010.3012.3016.3017.3018.3019.3028.3034.3038.3043.3052.3053.3055.3058.3059.3063.3066.3068.3070.3073.3074.3075.3076.3077.3089.3090.3093.3094.3095.3097.3099.3100.3106.3109.3112.3117.3119.3126.3127.3128.3130.3135.3136.3145.3150.3151.3154.3155.3163.3167.3172.3173.3182.3183.3184.3185.3187.3188.3189.3190.3194.3196.3209.3210.3211.3214.3215.3217.3222.3223.3225.3226.3227.3228.3230.3231.3234.3235.3236.3237.3238.3240.3244.3245.3250.3251.3253.3257.3260.3270.3272.3281.3288.3290.3292.3293.3296.3299.3300.3306.3307.3309.3314.3315.3316.3318.3324.3328.3330.3331.3531.3731.3831.4131.4531.4631.4731.4831.5231.6931.7235.7831.7931.8931.9731.10231.10631.10831.11031.11531.12831.13632.13731.14034.14133.14237.14332.15731.16831.16931.21233.23031.25131.25731.25931.26031.26831.27731.27831.28031.28731.28831.29631.32531.34231.34631.36831.39131.39531.40632.41531.43631.43731.43831.45931; supports_webp=true; is_shipping_fees_applied_info_banner_dismissed=false; _gcl_au=1.1.69071938.1759824302; __ps_sr=_; __ps_slu=https://www.vinted.de/api/v2/catalog/items?search_text=Tottenham&size_ids[]=209; access_token_web=eyJraWQiOiJFNTdZZHJ1SHBsQWp1MmNObzFEb3JIM2oyN0J1NS1zX09QNVB3UGlobjVNIiwiYWxnIjoiUFMyNTYifQ.eyJhY2NvdW50X2lkIjo2MjA5MjI4MywiYXBwX2lkIjo0LCJhdWQiOiJmci5jb3JlLmFwaSIsImNsaWVudF9pZCI6IndlYiIsImV4cCI6MTc2MDM3MDc3NSwiaWF0IjoxNzYwMzYzNTc1LCJpc3MiOiJ2aW50ZWQtaWFtLXNlcnZpY2UiLCJsb2dpbl90eXBlIjozLCJwdXJwb3NlIjoiYWNjZXNzIiwic2NvcGUiOiJ1c2VyIiwic2lkIjoiMWNmMDJkOGItMTc0NzA1NzQyOCIsInN1YiI6Ijg2MjAzNDI3IiwiY2MiOiJERSIsImFuaWQiOiJiYTBjYzg0OC03MDVhLTRlNzMtOThlYi1mMDMwMzRjYTM4MDEiLCJhY3QiOnsic3ViIjoiODYyMDM0MjcifX0.dxQ6czqhSTpRa0ZVfhcoiNScjuI6oe2Ip7zzWC6l6sHt0UrC7MbyeuUDQxbCPh6fMBRQCSUKOKE2MzXyPHNKkJOIXGLwj2_ItR_ESzE6wGXWqc4ey-IMpAFAPKDk7cC4oMjoc-6dxJx_p9YumNBqmlYI1UwEKeR_6XS-pfXlsaKayDimJEj6cwDbd_B72UahxT8NyycTNTZgaAuUIGzXS7VIbbtCEsv5dNwf0BsrrV6ypRhf8qP_beEDjF0Jm9Z7DDq_OVHL9gpjclJCNygKMmcHEafbPvEib8ELouEdP0-AIq4MsOWH4Etko3X6FKGi04SRn217oQexctWiYXU73Q; refresh_token_web=eyJraWQiOiJFNTdZZHJ1SHBsQWp1MmNObzFEb3JIM2oyN0J1NS1zX09QNVB3UGlobjVNIiwiYWxnIjoiUFMyNTYifQ.eyJhY2NvdW50X2lkIjo2MjA5MjI4MywiYXBwX2lkIjo0LCJhdWQiOiJmci5jb3JlLmFwaSIsImNsaWVudF9pZCI6IndlYiIsImV4cCI6MTc2MDk2ODM3NSwiaWF0IjoxNzYwMzYzNTc1LCJpc3MiOiJ2aW50ZWQtaWFtLXNlcnZpY2UiLCJsb2dpbl90eXBlIjozLCJwdXJwb3NlIjoicmVmcmVzaCIsInNjb3BlIjoidXNlciIsInNpZCI6IjFjZjAyZDhiLTE3NDcwNTc0MjgiLCJzdWIiOiI4NjIwMzQyNyIsImNjIjoiREUiLCJhbmlkIjoiYmEwY2M4NDgtNzA1YS00ZTczLTk4ZWItZjAzMDM0Y2EzODAxIiwiYWN0Ijp7InN1YiI6Ijg2MjAzNDI3In19.mCOJAmoQ1EVVulDSGmzyGJzCyl1iPPVx1UJwYx0jylAj4KvuLrS1qcEN3c2sxJmfTpdiFgGH4aNwVrgksf34sEdtnbhENCPTxw8AYLq7tyYESH3KqIE2xEVXzvRk3EZA2O_Pvv1c7IZragQeuWyDEqSNmtv1QlkGIl7fi-O6EcK7D27ifvBXGfI4e2xcYSfz_m-3gAXk_168cuHp3fii9UWFv2i_YZ2N3DnmAImGP3cS7Ozsv2KR9rKb_IlpWkd_3KveuUjlaf726RWyXDmar6joYabH83CtJZSoChykITa8uqQSUiSLGtbO7NmEMAhLopfJnF6o4jflsX5ksDHw6A; cto_bundle=mBNNsl81NDNIVEolMkZtNlZyUzZJeDI2UVBJMnV6RzVEUlg5TE52VUNQSjhEUW1uU0M3aVJ6WThwTVc5UWpXSDZ3VW9ZJTJGNDNuWVZRSUg0WnlWaWtiWGdwVmdkeDhsMFZ2UThhZHkwTjc3Z2Q2b3lrZkEyWTklMkZiOGYzOTl1SW12T1pCWWVPazM0V21xem5BMkUyOGxGRm1IMmVUJTJGUSUzRCUzRA; cto_bundle=mBNNsl81NDNIVEolMkZtNlZyUzZJeDI2UVBJMnV6RzVEUlg5TE52VUNQSjhEUW1uU0M3aVJ6WThwTVc5UWpXSDZ3VW9ZJTJGNDNuWVZRSUg0WnlWaWtiWGdwVmdkeDhsMFZ2UThhZHkwTjc3Z2Q2b3lrZkEyWTklMkZiOGYzOTl1SW12T1pCWWVPazM0V21xem5BMkUyOGxGRm1IMmVUJTJGUSUzRCUzRA; homepage_session_id=9f331ca4-007d-4eb8-8d8d-23f8b93ae1c5; cf_clearance=GVGdqR8tMCyp8OLaIAjAmrqw4tHAv.IxyIgjlxSQTV4-1760365355-1.2.1.1-dctgsYzz3W8daQId51fmm780gHt8ELXJn9_rbEjPk1zX.iW4yLoK53.bq4s.blfMCvziSx2YKNIVIzKT5ksh0FZ4BG18Rppewcnf9jKW99h6izKa1Efh7OvRckUt59DXDKdRtV2_ZgPBktNLtc02.SvVHq9vlui5DQS3UZQ_9BVa11DUilG1z1yiBUE62qsOtFskFRMa06MuwcZsebZ20Q0Prsw3V4gh0qfbmamkzpI; OptanonConsent=isGpcEnabled=0&datestamp=Mon+Oct+13+2025+16%3A22%3A35+GMT%2B0200+(Mitteleurop%C3%A4ische+Sommerzeit)&version=202508.2.0&browserGpcFlag=0&isIABGlobal=false&consentId=86203427&interactionCount=35&hosts=&landingPath=NotLandingPage&groups=C0001%3A1%2CC0002%3A1%2CC0003%3A1%2CC0004%3A1%2CC0005%3A1%2CV2STACK42%3A1%2CC0035%3A1%2CC0038%3A1&geolocation=ES%3BCL&AwaitingReconsent=false&genVendors=V2%3A1%2CV1%3A1%2C&isAnonUser=1&intType=1; viewport_size=1253; banners_ui_state=SUCCESS; _ga_ZJHK1N3D75=GS2.1.s1760363071$o394$g1$t1760365356$j57$l0$h0; _ga_MVN5WH8RG9=GS2.1.s1760363071$o394$g1$t1760365356$j57$l0$h0; datadome=xj8MSuPEBQ6IAGe_NvDUq7zh2Ha04WpoUMeMIBwut1qo6lgwkYxflUj90AkppOwvJsCp6TWW9WdCECZoTIF3SWvEBtdJWcG0qgJnZ4AW1Bl9sZDHjGQdxgEVOtxW8fZ0; _vinted_fr_session=blZSb0l3TE4xQWJTV3RoNHI4TWxyamZURWFTN2JObVgyOFF5NG1YZE5RbGFOdm1ZNjZtZWNOQThkL2FZVU1jczV3ZlBYaVVzQ0h1MmFDZ0txMU5TcGJrcStyWm9mMkFKNzdkVGFZbStNRzY0Z0Mvd0drVmlJK1ZQYmpjb29rbUg0ZjY1QUdtVndqVTEwcUpIdkRKbzdNWGRhNlJDWU1weDRISnROMFNzeDZQTkRsRzNrbGFjSVBsYjZHVVJLbkorM1BIbHdJaXVLdFcvc2VjbVI0TnBwbzAwaW5GaGhJVTJWRTdERkQyMEhCWlQzclF5M1ROaDZ0OSt1UzFWRjNzcnZaWDVvdjRUaWxJN1Q2bVc2OEQ2eHNqeTB2dWxFbjkwQktZQ2pzY3BRaFZFa0h2cTZWOHM5c3M1eGZINzBTNHg0YnNzOHhjektKWXhhN3BGYjZxcE4vT3VBN1FuYzI2cXlBenJienV1bU5scHlMd3prNU93ZGxjVmxObzlpc2hXYnFCdlgwTEhOdkE4Z244WEMzZ2hlenFpT2FPM1NOUlNoOVNrM05JV2NKbndndjNaN3prZ2RhLzRTZWRTWFNVeWhuYjBCRjVvTTFHRGdBem1aZWFTL01JdXhIdThnOXF2TFNpM1NDWFcwK0dkMkFtYnUzTGlhbms4TnA1YzN4amlPS0N6QW50NmlBekVWU3dRdGp5SUllV0tHMkRPbjFsQVE2R3I0UStad1l3TzFYcTYyS1ArOVd0VnA2KzNjeW11VlA2THY0V1pXR2hkUzJkSndrdGtJcGJZMFZxUFFjd3h2OGY2cFRsZU1saTRGNXc0OTRRVHRmaGtTS2QvZ0NPWDE4dXAwb3BZOURWS2pvL1pQdlphblM1YzB6Z1kvWDBGTDV1UkZnemRkMFNrZ2UralNkYmhFYkR0Znh6NXpTTmlTMVI5WEFxUmUra1gzcDJXaFdxa2s5NXdiQTFmTW84cHJqUHBHOTUrZy9QL2w2b2ViTE4xS2ZuNzkxRkNkMXdiLS1mUjJzL1lpSlpzY0h1ek1MUC9NUEZ3PT0%3D--2ed368845d909d57e4d9ff23f6244dc55cc5b13b";

      // const res = await axios.get(searchQuery, {
      //   headers: {
      //     "User-Agent": "Chrome/141.0.0.0",
      //     Cookie: cookie,
      //   },
      // });

      const res = await axios.get(
        "https://www.vinted.de/api/v2/catalog/items?search_text=nike&per_page=10"
      );
      setResponse(res.data.message);
    } catch (err) {
      if (err.response) {
        setResponse(err.response.data.error);
      } else {
        setResponse("Error de conexión con la API.");
      }
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Team"
          name="team"
          rules={[
            { required: true, message: "Please input your jersey's team!" },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item name="size" label="Size" rules={[{ required: true }]}>
          <Select
            placeholder="Select a option"
            onChange={(value) => setSize(value)}
            allowClear
          >
            <Option value="M">M</Option>
            <Option value="L">L</Option>
            <Option value="XL">XL</Option>
          </Select>
        </Form.Item>

        <Form.Item name="longSleeve" valuePropName="islongsleeve" label={null}>
          <Checkbox>Check for long sleeve</Checkbox>
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Space>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
            <Button htmlType="button" onClick={onReset}>
              Reset
            </Button>
          </Space>
        </Form.Item>
      </Form>

      <h1>Response</h1>
      {response ?? <p>{response}</p>}
    </>
  );
};

export default Search;

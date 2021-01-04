bus_ids = [1789,37,47,1889]
# NOTE: assumes no 'x' buses, otherwise edit + N below, where N is natural no

daugiklis = 0

nezinau_ats = True
while nezinau_ats:

    timestamp = bus_ids[0] * daugiklis

    if (timestamp + 1) % bus_ids[1] == 0:
        if (timestamp + 2) % bus_ids[2] == 0:
            if (timestamp + 3) % bus_ids[3] == 0:

                nezinau_ats = False
                print(f"radau timestamp: {timestamp}")

            else:
                daugiklis += 1
        else:
            daugiklis += 1
    else:
        daugiklis += 1
